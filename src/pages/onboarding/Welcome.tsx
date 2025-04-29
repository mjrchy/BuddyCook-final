
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-12">
      <div className="mb-8">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
            <line x1="6" y1="17" x2="18" y2="17" />
          </svg>
        </div>
      </div>
      
      <h1 className="text-2xl font-bold mb-3">Welcome to BuddyCook!</h1>
      <p className="text-gray-600 mb-8">Tell us about your food preferences so we can personalize your experience.</p>
      
      <Button 
        className="w-full"
        onClick={() => navigate('/demographics')}
      >
        Get Started
      </Button>
    </div>
  );
};

export default Welcome;
