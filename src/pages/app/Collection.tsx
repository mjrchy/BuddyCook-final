
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Search as SearchIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RecipeCard from '@/components/RecipeCard';

// Mock data - in a real app this would come from an API or context
const mockCollections = {
  '1': { 
    id: '1', 
    name: 'Low Calorie Favorites',
    recipes: [
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
    ]
  },
  '2': {
    id: '2',
    name: 'Keto Lunchbox Ideas',
    recipes: [
      { 
        id: '4', 
        title: 'Avocado Toast', 
        image: 'avocado-toast.png', 
        cookTime: '10 min',
        calories: '280 kcal',
        tags: ['Breakfast', 'Keto'],
        bookmarked: true
      },
      { 
        id: '5', 
        title: 'Egg Muffins', 
        image: 'egg-muffins.png', 
        cookTime: '25 min',
        calories: '200 kcal',
        tags: ['Breakfast', 'Keto', 'Meal Prep'],
        bookmarked: true
      },
    ]
  }
};

const Collection = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [collection, setCollection] = useState<any>(null);
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, fetch data from API or context instead of using mock data
    if (id && mockCollections[id as keyof typeof mockCollections]) {
      setCollection(mockCollections[id as keyof typeof mockCollections]);
      setFilteredRecipes(mockCollections[id as keyof typeof mockCollections].recipes);
    } else {
      // Redirect to bookmarks if collection doesn't exist
      navigate('/bookmarks');
    }
  }, [id, navigate]);

  // Filter recipes based on search query
  useEffect(() => {
    if (collection) {
      if (searchQuery) {
        const filtered = collection.recipes.filter((recipe: any) => 
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredRecipes(filtered);
      } else {
        setFilteredRecipes(collection.recipes);
      }
    }
  }, [searchQuery, collection]);

  if (!collection) {
    return <div className="mobile-container">Loading...</div>;
  }

  return (
    <div className="mobile-container">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          className="mr-2"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={24} />
        </Button>
        <h1 className="text-xl font-bold">Collection</h1>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">{collection.name}</h2>
      
      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input 
          placeholder="Search in this collection" 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {filteredRecipes.map((recipe: any) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No recipes found. Try adjusting your search.
        </div>
      )}
    </div>
  );
};

export default Collection;
