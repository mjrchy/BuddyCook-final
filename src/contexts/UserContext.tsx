
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextProps {
  personalInfo: {
    name: string;
    sex: string;
    weight?: number;
    height?: number;
    age?: number;
  };
  dietaryPreferences: string[];
  foodAllergies: string[];
  cookingExperience: string;
  healthGoals: string[];
  updatePersonalInfo: (info: any) => void;
  updateDietaryPreferences: (prefs: string[]) => void;
  updateFoodAllergies: (allergies: string[]) => void;
  updateCookingExperience: (experience: string) => void;
  updateHealthGoals: (goals: string[]) => void;
  completeOnboarding: () => void;
  isOnboardingCompleted: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    sex: '',
    weight: undefined,
    height: undefined,
    age: undefined,
  });
  
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [foodAllergies, setFoodAllergies] = useState<string[]>([]);
  const [cookingExperience, setCookingExperience] = useState<string>('');
  const [healthGoals, setHealthGoals] = useState<string[]>([]);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  useEffect(() => {
    // Check if onboarding is completed in localStorage
    const completed = localStorage.getItem('onboardingCompleted') === 'true';
    setIsOnboardingCompleted(completed);

    // Load user data from localStorage if it exists
    if (completed) {
      const storedPersonalInfo = localStorage.getItem('personalInfo');
      const storedDietaryPreferences = localStorage.getItem('dietaryPreferences');
      const storedFoodAllergies = localStorage.getItem('foodAllergies');
      const storedCookingExperience = localStorage.getItem('cookingExperience');
      const storedHealthGoals = localStorage.getItem('healthGoals');

      if (storedPersonalInfo) setPersonalInfo(JSON.parse(storedPersonalInfo));
      if (storedDietaryPreferences) setDietaryPreferences(JSON.parse(storedDietaryPreferences));
      if (storedFoodAllergies) setFoodAllergies(JSON.parse(storedFoodAllergies));
      if (storedCookingExperience) setCookingExperience(storedCookingExperience);
      if (storedHealthGoals) setHealthGoals(JSON.parse(storedHealthGoals));
    }
  }, []);

  const updatePersonalInfo = (info: any) => {
    const updatedInfo = { ...personalInfo, ...info };
    setPersonalInfo(updatedInfo);
    localStorage.setItem('personalInfo', JSON.stringify(updatedInfo));
  };

  const updateDietaryPreferences = (prefs: string[]) => {
    setDietaryPreferences(prefs);
    localStorage.setItem('dietaryPreferences', JSON.stringify(prefs));
  };

  const updateFoodAllergies = (allergies: string[]) => {
    setFoodAllergies(allergies);
    localStorage.setItem('foodAllergies', JSON.stringify(allergies));
  };

  const updateCookingExperience = (experience: string) => {
    setCookingExperience(experience);
    localStorage.setItem('cookingExperience', experience);
  };

  const updateHealthGoals = (goals: string[]) => {
    setHealthGoals(goals);
    localStorage.setItem('healthGoals', JSON.stringify(goals));
  };

  const completeOnboarding = () => {
    setIsOnboardingCompleted(true);
    localStorage.setItem('onboardingCompleted', 'true');
  };

  return (
    <UserContext.Provider value={{
      personalInfo,
      dietaryPreferences,
      foodAllergies,
      cookingExperience,
      healthGoals,
      updatePersonalInfo,
      updateDietaryPreferences,
      updateFoodAllergies,
      updateCookingExperience,
      updateHealthGoals,
      completeOnboarding,
      isOnboardingCompleted,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
