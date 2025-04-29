
import { Link } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { personalInfo, dietaryPreferences, foodAllergies, cookingExperience, healthGoals } = useUser();

  return (
    <div className="mobile-container">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
          {personalInfo.name ? personalInfo.name[0].toUpperCase() : 'U'}
        </div>
        <h1 className="text-xl font-bold">{personalInfo.name || 'User'}</h1>
      </div>
      
      <div className="border rounded-lg mb-6">
        <button className="flex justify-between items-center w-full p-4 text-left border-b">
          <div>
            <h3 className="font-medium">Edit Profile</h3>
          </div>
          <div className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </button>
        
        <button className="flex justify-between items-center w-full p-4 text-left border-b">
          <div>
            <h3 className="font-medium">Allergy Management</h3>
            <p className="text-sm text-gray-500">
              {foodAllergies.length > 0 
                ? foodAllergies.slice(0, 2).join(', ') + (foodAllergies.length > 2 ? '...' : '')
                : 'No allergies set'}
            </p>
          </div>
          <div className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </button>
        
        <button className="flex justify-between items-center w-full p-4 text-left border-b">
          <div>
            <h3 className="font-medium">Dietary Preferences</h3>
            <p className="text-sm text-gray-500">
              {dietaryPreferences.length > 0 
                ? dietaryPreferences.slice(0, 2).join(', ') + (dietaryPreferences.length > 2 ? '...' : '')
                : 'No preferences set'}
            </p>
          </div>
          <div className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </button>
        
        <button className="flex justify-between items-center w-full p-4 text-left border-b">
          <div>
            <h3 className="font-medium">Cooking Experience</h3>
            <p className="text-sm text-gray-500">
              {cookingExperience || 'Not set'}
            </p>
          </div>
          <div className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </button>
        
        <button className="flex justify-between items-center w-full p-4 text-left">
          <div>
            <h3 className="font-medium">Goal Setting</h3>
            <p className="text-sm text-gray-500">
              {healthGoals.length > 0 
                ? healthGoals.slice(0, 2).join(', ') + (healthGoals.length > 2 ? '...' : '')
                : 'No goals set'}
            </p>
          </div>
          <div className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </button>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={() => {
          localStorage.clear();
          window.location.href = '/welcome';
        }}
      >
        Reset & Start Over
      </Button>
    </div>
  );
};

export default Profile;
