
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { Home, Search, Bookmark, User } from 'lucide-react';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 pb-16">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      {/*  */}
        <nav className="max-w-[390px] w-full mx-auto fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-4">
          <div className="max-w-md mx-auto flex justify-between items-center">
            <NavLink to="/home" className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? 'text-primary' : 'text-gray-500'}`
            }>
              <Home size={24} />
              <span className="text-xs mt-1">Home</span>
            </NavLink>
            <NavLink to="/search" className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? 'text-primary' : 'text-gray-500'}`
            }>
              <Search size={24} />
              <span className="text-xs mt-1">Search</span>
            </NavLink>
            <NavLink to="/bookmarks" className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? 'text-primary' : 'text-gray-500'}`
            }>
              <Bookmark size={24} />
              <span className="text-xs mt-1">Bookmarks</span>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? 'text-primary' : 'text-gray-500'}`
            }>
              <User size={24} />
              <span className="text-xs mt-1">Profile</span>
            </NavLink>
          </div>
        </nav>
      </div>
  );
};

export default MainLayout;
