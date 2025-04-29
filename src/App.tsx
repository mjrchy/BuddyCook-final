import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';

// Onboarding Pages
import Welcome from "./pages/onboarding/Welcome";
import Demographics from "./pages/onboarding/Demographics";
import DietaryPreferences from "./pages/onboarding/DietaryPreferences";
import FoodAllergies from "./pages/onboarding/FoodAllergies";
import CookingExperience from "./pages/onboarding/CookingExperience";
import GoalSetting from "./pages/onboarding/GoalSetting";

// Main App Pages
import Home from "./pages/app/Home";
import Search from "./pages/app/Search";
import Bookmarks from "./pages/app/Bookmarks";
import Profile from "./pages/app/Profile";
import Recipe from "./pages/app/Recipe";
import Collection from "./pages/app/Collection";

// Layout Components
import MainLayout from "./layouts/MainLayout";
import OnboardingLayout from "./layouts/OnboardingLayout";

// Not Found Page
import NotFound from "./pages/NotFound";

// User Context Provider
import { UserProvider } from "./contexts/UserContext";

const queryClient = new QueryClient();

const App = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    if (onboardingCompleted === 'true') {
      setHasCompletedOnboarding(true);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="max-w-[390px] w-full mx-auto bg-white min-h-screen shadow-lg overflow-hidden">

            <BrowserRouter>
              <Routes>
                {/* Redirect based on onboarding status */}
                <Route path="/" element={hasCompletedOnboarding ? <Navigate to="/home" /> : <Navigate to="/welcome" />} />

                {/* Onboarding Routes */}
                <Route element={<OnboardingLayout />}>
                  <Route path="/welcome" element={<Welcome />} />
                  <Route path="/demographics" element={<Demographics />} />
                  <Route path="/dietary-preferences" element={<DietaryPreferences />} />
                  <Route path="/food-allergies" element={<FoodAllergies />} />
                  <Route path="/cooking-experience" element={<CookingExperience />} />
                  <Route path="/goal-setting" element={<GoalSetting />} />
                </Route>

                {/* Main App Routes */}
                <Route element={<MainLayout />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/bookmarks" element={<Bookmarks />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/recipe/:id" element={<Recipe />} />
                  <Route path="/collection/:id" element={<Collection />} />
                </Route>

                {/* Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>

        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
