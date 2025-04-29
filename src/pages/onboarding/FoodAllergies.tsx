
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from '@/contexts/UserContext';

const FoodAllergies = () => {
  const navigate = useNavigate();
  const { foodAllergies, updateFoodAllergies } = useUser();
  
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(foodAllergies || []);
  const [customAllergy, setCustomAllergy] = useState('');

  const allergyOptions = ['Peanut', 'Tree Nuts', 'Milk', 'Eggs', 'Fish', 'Shellfish', 'Soy', 'Wheat', 'Gluten'];

  const handleToggleAllergy = (allergy: string) => {
    setSelectedAllergies(prev => 
      prev.includes(allergy) 
        ? prev.filter(a => a !== allergy) 
        : [...prev, allergy]
    );
  };

  const handleAddCustom = () => {
    if (customAllergy && !selectedAllergies.includes(customAllergy)) {
      setSelectedAllergies(prev => [...prev, customAllergy]);
      setCustomAllergy('');
    }
  };

  const handleSubmit = () => {
    updateFoodAllergies(selectedAllergies);
    navigate('/cooking-experience');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="step-indicator">
        <div className="step"></div>
        <div className="step"></div>
        <div className="step active"></div>
        <div className="step"></div>
        <div className="step"></div>
      </div>
      
      <h2 className="text-xl font-bold mb-2">Food Allergies</h2>
      <p className="text-gray-600 mb-6">Let us know about any food allergies so we can provide safe recipes.</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {allergyOptions.map(allergy => (
          <button
            key={allergy}
            className={`diet-tag ${selectedAllergies.includes(allergy) ? 'selected' : ''}`}
            onClick={() => handleToggleAllergy(allergy)}
            type="button"
          >
            {allergy}
          </button>
        ))}
      </div>
      
      <div className="flex items-center space-x-2 mb-8">
        <Input 
          placeholder="Other"
          value={customAllergy}
          onChange={(e) => setCustomAllergy(e.target.value)}
          className="flex-1"
        />
        <Button 
          onClick={handleAddCustom} 
          disabled={!customAllergy}
          type="button"
        >
          Add
        </Button>
      </div>
      
      <div className="mt-auto flex justify-between">
        <Button 
          variant="outline"
          onClick={() => navigate('/dietary-preferences')}
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

export default FoodAllergies;
