
import { Outlet } from 'react-router-dom';

const OnboardingLayout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 mobile-container flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default OnboardingLayout;
