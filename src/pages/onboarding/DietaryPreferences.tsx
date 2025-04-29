
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from '@/contexts/UserContext';

const DietaryPreferences = () => {
  const navigate = useNavigate();
  const { dietaryPreferences, updateDietaryPreferences } = useUser();
  
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(dietaryPreferences || []);
  const [customPreference, setCustomPreference] = useState('');

  const dietaryOptions = ['Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo', 'Gluten-Free', 'Dairy-Free', 'Low-carb', 'Low-fat'];

  const handleTogglePreference = (preference: string) => {
    setSelectedPreferences(prev => 
      prev.includes(preference) 
        ? prev.filter(p => p !== preference) 
        : [...prev, preference]
    );
  };

  const handleAddCustom = () => {
    if (customPreference && !selectedPreferences.includes(customPreference)) {
      setSelectedPreferences(prev => [...prev, customPreference]);
      setCustomPreference('');
    }
  };

  const handleSubmit = () => {
    updateDietaryPreferences(selectedPreferences);
    navigate('/food-allergies');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="step-indicator">
        <div className="step"></div>
        <div className="step active"></div>
        <div className="step"></div>
        <div className="step"></div>
        <div className="step"></div>
      </div>
      
      <h2 className="text-xl font-bold mb-2">Dietary Preferences</h2>
      <p className="text-gray-600 mb-6">Select any dietary lifestyles that apply to you.</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {dietaryOptions.map(diet => (
          <button
            key={diet}
            className={`diet-tag ${selectedPreferences.includes(diet) ? 'selected' : ''}`}
            onClick={() => handleTogglePreference(diet)}
            type="button"
          >
            {diet}
          </button>
        ))}
      </div>
      
      <div className="flex items-center space-x-2 mb-8">
        <Input 
          placeholder="Other"
          value={customPreference}
          onChange={(e) => setCustomPreference(e.target.value)}
          className="flex-1"
        />
        <Button 
          onClick={handleAddCustom} 
          disabled={!customPreference}
          type="button"
        >
          Add
        </Button>
      </div>
      
      <div className="mt-auto flex justify-between">
        <Button 
          variant="outline"
          onClick={() => navigate('/demographics')}
        >
          Back
        </Button>
        <Button onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default DietaryPreferences;
