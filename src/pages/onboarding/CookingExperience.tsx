
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useUser } from '@/contexts/UserContext';

const CookingExperience = () => {
  const navigate = useNavigate();
  const { cookingExperience, updateCookingExperience } = useUser();
  
  const [selectedExperience, setSelectedExperience] = useState(cookingExperience || '');

  const handleExperienceChange = (value: string) => {
    setSelectedExperience(value);
  };

  const handleSubmit = () => {
    updateCookingExperience(selectedExperience);
    navigate('/goal-setting');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="step-indicator">
        <div className="step"></div>
        <div className="step"></div>
        <div className="step"></div>
        <div className="step active"></div>
        <div className="step"></div>
      </div>
      
      <h2 className="text-xl font-bold mb-2">Cooking Experience</h2>
      <p className="text-gray-600 mb-6">What's your level of cooking experience?</p>
      
      <div className="mb-8">
        <Select value={selectedExperience} onValueChange={handleExperienceChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select your experience level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="expert">Expert</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="mt-6 space-y-4">
          <div className={`p-4 rounded-lg border ${selectedExperience === 'beginner' ? 'border-primary bg-blue-50' : 'border-gray-200'}`}>
            <h3 className="font-medium">Beginner</h3>
            <p className="text-sm text-gray-600">I'm new to cooking or only know basic recipes</p>
          </div>
          
          <div className={`p-4 rounded-lg border ${selectedExperience === 'intermediate' ? 'border-primary bg-blue-50' : 'border-gray-200'}`}>
            <h3 className="font-medium">Intermediate</h3>
            <p className="text-sm text-gray-600">I can follow most recipes and have some cooking techniques</p>
          </div>
          
          <div className={`p-4 rounded-lg border ${selectedExperience === 'expert' ? 'border-primary bg-blue-50' : 'border-gray-200'}`}>
            <h3 className="font-medium">Expert</h3>
            <p className="text-sm text-gray-600">I'm very confident in the kitchen and can create my own recipes</p>
          </div>
        </div>
      </div>
      
      <div className="mt-auto flex justify-between">
        <Button 
          variant="outline"
          onClick={() => navigate('/food-allergies')}
        >
          Back
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!selectedExperience}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CookingExperience;
