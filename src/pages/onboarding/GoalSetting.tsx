
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from '@/contexts/UserContext';

const GoalSetting = () => {
  const navigate = useNavigate();
  const { healthGoals, updateHealthGoals, completeOnboarding } = useUser();
  
  const [selectedGoals, setSelectedGoals] = useState<string[]>(healthGoals || []);
  const [customGoal, setCustomGoal] = useState('');

  const goalOptions = ['Weight loss', 'Muscle gain', 'Balanced diet', 'Other'];

  const handleToggleGoal = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal) 
        : [...prev, goal]
    );
  };

  const handleAddCustom = () => {
    if (customGoal && !selectedGoals.includes(customGoal)) {
      setSelectedGoals(prev => [...prev, customGoal]);
      setCustomGoal('');
    }
  };

  const handleSubmit = () => {
    updateHealthGoals(selectedGoals);
    completeOnboarding();
    navigate('/home');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="step-indicator">
        <div className="step"></div>
        <div className="step"></div>
        <div className="step"></div>
        <div className="step"></div>
        <div className="step active"></div>
      </div>
      
      <h2 className="text-xl font-bold mb-2">Goal Setting</h2>
      <p className="text-gray-600 mb-6">What is your health goal?</p>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        {goalOptions.map(goal => (
          <button
            key={goal}
            className={`diet-tag ${selectedGoals.includes(goal) ? 'selected' : ''}`}
            onClick={() => handleToggleGoal(goal)}
            type="button"
          >
            {goal}
          </button>
        ))}
      </div>
      
      {selectedGoals.includes('Other') && (
        <div className="flex items-center space-x-2 mb-8">
          <Input 
            placeholder="Specify your goal"
            value={customGoal}
            onChange={(e) => setCustomGoal(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={handleAddCustom} 
            disabled={!customGoal}
            type="button"
          >
            Add
          </Button>
        </div>
      )}
      
      <div className="mt-auto flex justify-between">
        <Button 
          variant="outline"
          onClick={() => navigate('/cooking-experience')}
        >
          Back
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={selectedGoals.length === 0}
        >
          Finish
        </Button>
      </div>
    </div>
  );
};

export default GoalSetting;
