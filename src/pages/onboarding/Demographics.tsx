
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from '@/contexts/UserContext';

const Demographics = () => {
  const navigate = useNavigate();
  const { personalInfo, updatePersonalInfo } = useUser();
  
  const [formData, setFormData] = useState({
    name: personalInfo.name || '',
    sex: personalInfo.sex || '',
    age: personalInfo.age || '',
    height: personalInfo.height || '',
    weight: personalInfo.weight || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo({
      name: formData.name,
      sex: formData.sex,
      age: formData.age ? Number(formData.age) : undefined,
      height: formData.height ? Number(formData.height) : undefined,
      weight: formData.weight ? Number(formData.weight) : undefined,
    });
    navigate('/dietary-preferences');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="step-indicator">
        <div className="step active"></div>
        <div className="step"></div>
        <div className="step"></div>
        <div className="step"></div>
        <div className="step"></div>
      </div>
      
      <h2 className="text-xl font-bold mb-2">Help us personalize your nutrition goals</h2>
      <p className="text-gray-600 mb-6">Please provide some basic information about yourself.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        <div className="space-y-2">
          <Label htmlFor="sex">What is your sex?</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              type="button"
              variant={formData.sex === 'Female' ? 'default' : 'outline'}
              onClick={() => setFormData(prev => ({ ...prev, sex: 'Female' }))}
            >
              Female
            </Button>
            <Button 
              type="button"
              variant={formData.sex === 'Male' ? 'default' : 'outline'}
              onClick={() => setFormData(prev => ({ ...prev, sex: 'Male' }))}
            >
              Male
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input 
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            placeholder="Your age"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input 
            id="height"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleChange}
            placeholder="Your height"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input 
            id="weight"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Your weight"
          />
        </div>

        <div className="pt-4 flex justify-between">
          <Button 
            type="button"
            variant="outline"
            onClick={() => navigate('/welcome')}
          >
            Back
          </Button>
          <Button type="submit">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Demographics;
