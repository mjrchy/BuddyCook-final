
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from '@/contexts/UserContext';
import RecipeCard from '@/components/RecipeCard';

// Mock data
const mockRecipes = [
  { 
    id: '1', 
    title: 'Burger', 
    image: 'burger.jpg', 
    cookTime: '30 min',
    calories: '450 kcal',
    tags: ['Dinner', 'American'],
    bookmarked: true
  },
  { 
    id: '2', 
    title: 'Spaghetti', 
    image: 'spaghetti.png', 
    cookTime: '25 min',
    calories: '380 kcal',
    tags: ['Dinner', 'Italian'],
    bookmarked: false
  },
  { 
    id: '3', 
    title: 'Chicken Salad', 
    image: 'chicken-salad.png', 
    cookTime: '15 min',
    calories: '320 kcal',
    tags: ['Lunch', 'Healthy'],
    bookmarked: true
  },
  { 
    id: '4', 
    title: 'Pancakes', 
    image: 'pancake.png', 
    cookTime: '20 min',
    calories: '420 kcal',
    tags: ['Breakfast', 'Sweet'],
    bookmarked: false
  },
];

const categories = [
  { id: '1', name: 'Breakfast', icon: '🍳', color: 'bg-orange-200' },
  { id: '2', name: 'Lunch', icon: '🥪', color: 'bg-green-200' },
  { id: '3', name: 'Dinner', icon: '🍽️', color: 'bg-purple-200' },
  { id: '4', name: 'Snacks', icon: '🍿', color: 'bg-yellow-200' },
];

const Home = () => {
  const navigate = useNavigate();
  const { personalInfo } = useUser();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  }
  
  const handleCategoryClick = (category) => {
    navigate(`/search?category=${category}`);
  }

  return (
    <div className="mobile-container">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-900">Hello, {personalInfo.name || 'there'}!</h1>
          <p className="text-gray-600">What would you like to cook today?</p>
        </div>
        <div className="w-10 h-10 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full"></div>
      </div>
      
      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input 
            placeholder="Search any recipes" 
            className="pl-10 border-2 border-gray-200 focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button size="icon" variant="outline" type="button">
          <Filter size={20} />
        </Button>
      </form>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg text-primary-800">Categories</h2>
          <Link to="/search" className="text-sm text-primary hover:underline">See all</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.map(category => (
            <div 
              key={category.id} 
              className="flex flex-col items-center cursor-pointer" 
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className={`w-16 h-16 rounded-full ${category.color} hover:opacity-80 transition-opacity flex items-center justify-center text-2xl shadow-sm`}>
                {category.icon}
              </div>
              <span className="text-sm mt-1 text-gray-700">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg text-primary-800">Recommendation for you</h2>
          <Link to="/search" className="text-sm text-primary hover:underline">See all</Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {mockRecipes.slice(0, 2).map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg text-primary-800">Bookmarks</h2>
          <Link to="/bookmarks" className="text-sm text-primary hover:underline">See all</Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {mockRecipes.filter(r => r.bookmarked).map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
