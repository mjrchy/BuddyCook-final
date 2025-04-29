
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecipeCard from '@/components/RecipeCard';

// Mock data
const mockBookmarkedRecipes = [
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
    id: '3', 
    title: 'Chicken Salad', 
    image: 'chicken-salad.png', 
    cookTime: '15 min',
    calories: '320 kcal',
    tags: ['Lunch', 'Healthy'],
    bookmarked: true
  },
];

const mockCollections = [
  { 
    id: '1', 
    name: 'Low Calorie Favorites', 
    count: 5,
    color: 'from-green-200 to-blue-200'
  },
  { 
    id: '2', 
    name: 'Keto Lunchbox Ideas', 
    count: 8,
    color: 'from-purple-200 to-pink-200'
  },
];

const Bookmarks = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="mobile-container">
      <h1 className="text-2xl font-bold mb-6 text-primary-900">Bookmarks</h1>
      
      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input 
          placeholder="Search your recipes" 
          className="pl-10 border-2 border-gray-200 focus:border-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="recipes" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="recipes" className="data-[state=active]:bg-white data-[state=active]:text-primary-900">Recipes</TabsTrigger>
          <TabsTrigger value="collections" className="data-[state=active]:bg-white data-[state=active]:text-primary-900">Collections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recipes" className="mt-4 bg-white p-2 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            {mockBookmarkedRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="collections" className="mt-4 bg-white p-2 rounded-lg">
          <div className="space-y-3">
            {mockCollections.map(collection => (
              <Link 
                key={collection.id} 
                to={`/collection/${collection.id}`}
                className={`block rounded-lg p-4 flex justify-between items-center bg-gradient-to-r ${collection.color} shadow-sm hover:shadow-md transition-shadow`}
              >
                <div>
                  <h3 className="font-medium text-gray-800">{collection.name}</h3>
                  <p className="text-sm text-gray-600">{collection.count} recipes</p>
                </div>
                <div className="bg-white/50 backdrop-blur-sm w-12 h-12 rounded-md flex items-center justify-center text-lg shadow-inner">
                  📚
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bookmarks;
