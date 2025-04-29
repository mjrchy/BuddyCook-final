
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';

interface RecipeProps {
  id: string;
  title: string;
  image: string;
  cookTime: string;
  calories: string;
  tags: string[];
  bookmarked: boolean;
}

interface RecipeCardProps {
  recipe: RecipeProps;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(recipe.bookmarked);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card block">
      <div className="relative">
        <img 
          src={`/images/${recipe.image}`}
          alt={recipe.title} 
          className="w-full h-32 object-cover"
        />
        <button 
          className={`absolute top-2 right-2 p-1 rounded-full ${isBookmarked ? 'bg-primary text-white' : 'bg-white text-gray-600'}`}
          onClick={toggleBookmark}
        >
          <Bookmark size={18} />
        </button>
      </div>
      <div className="p-2">
        <h3 className="font-medium text-sm truncate">{recipe.title}</h3>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>⏱️ {recipe.cookTime}</span>
          <span>🔥 {recipe.calories}</span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
