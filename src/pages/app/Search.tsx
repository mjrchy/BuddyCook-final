
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  { 
    id: '5', 
    title: 'Avocado Toast', 
    image: 'avocado-toast.png', 
    cookTime: '10 min',
    calories: '280 kcal',
    tags: ['Breakfast', 'Healthy'],
    bookmarked: false
  },
  { 
    id: '6', 
    title: 'Salmon', 
    image: 'grilled-salmon.jpg', 
    cookTime: '25 min',
    calories: '350 kcal',
    tags: ['Dinner', 'Seafood'],
    bookmarked: false
  },
];

const categories = [
  { id: '1', name: 'All', color: 'bg-gradient-to-r from-gray-200 to-gray-300' },
  { id: '2', name: 'Breakfast', color: 'bg-gradient-to-r from-orange-200 to-yellow-200' },
  { id: '3', name: 'Lunch', color: 'bg-gradient-to-r from-green-200 to-teal-200' },
  { id: '4', name: 'Dinner', color: 'bg-gradient-to-r from-purple-200 to-indigo-200' },
  { id: '5', name: 'Snacks', color: 'bg-gradient-to-r from-pink-200 to-rose-200' },
];

const Search = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('1');
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes);

  // Parse query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryValue = queryParams.get('query');
    const categoryValue = queryParams.get('category');
    
    if (queryValue) {
      setSearchQuery(queryValue);
    }
    
    if (categoryValue) {
      const categoryObject = categories.find(cat => cat.name.toLowerCase() === categoryValue.toLowerCase());
      if (categoryObject) {
        setActiveCategory(categoryObject.id);
      }
    }
  }, [location.search]);

  // Filter recipes based on search query and category
  useEffect(() => {
    let results = [...mockRecipes];
    
    // Filter by search query if it exists
    if (searchQuery) {
      results = results.filter(recipe => 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by category if not "All"
    const selectedCategory = categories.find(cat => cat.id === activeCategory);
    if (selectedCategory && selectedCategory.name !== 'All') {
      results = results.filter(recipe => 
        recipe.tags.some(tag => tag === selectedCategory.name)
      );
    }
    
    setFilteredRecipes(results);
  }, [searchQuery, activeCategory]);

  return (
    <div className="mobile-container">
      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input 
            placeholder="Search for recipes" 
            className="pl-10 border-2 border-gray-200 focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button size="icon" variant="outline">
          <Filter size={20} />
        </Button>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className={`whitespace-nowrap ${activeCategory === category.id ? '' : category.color} ${activeCategory === category.id ? 'text-white' : 'text-gray-700'} font-medium shadow-sm`}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-100 rounded-lg">
          <p className="text-gray-600">No recipes found.</p>
          <p className="text-sm text-gray-500 mt-1">Try another search term or category</p>
        </div>
      )}
    </div>
  );
};

export default Search;
