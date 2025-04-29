
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

const Index = () => {
  const navigate = useNavigate();
  const { isOnboardingCompleted } = useUser();
  
  useEffect(() => {
    if (isOnboardingCompleted) {
      navigate('/home');
    } else {
      navigate('/welcome');
    }
  }, [isOnboardingCompleted, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    </div>
  );
};

export default Index;
