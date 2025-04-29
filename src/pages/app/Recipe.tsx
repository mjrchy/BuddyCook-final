
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Bookmark, Share, Info, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from 'recharts';

// Mock data
const mockRecipe = {
  id: '1',
  title: 'Classic Beef Burger',
  image: 'burger.jpg',
  cookTime: '30 min',
  calories: '450 kcal',
  servings: 4,
  tags: ['Dinner', 'American'],
  bookmarked: false,
  difficulty: 'Intermediate',
  nutritionalInfo: {
    calories: '450 kcal',
    protein: '25g',
    carbs: '35g',
    fat: '22g',
    fiber: '2g',
  },
  allergens: ['Gluten', 'Dairy'],
  ingredients: [
    { name: 'Ground beef', amount: '500g' },
    { name: 'Burger buns', amount: '4' },
    { name: 'Lettuce', amount: '4 leaves' },
    { name: 'Tomato', amount: '1 large' },
    { name: 'Cheddar cheese', amount: '4 slices' },
    { name: 'Onion', amount: '1 small' },
  ],
  instructions: [
    'Form the ground beef into 4 patties, season with salt and pepper.',
    'Heat a pan or grill over medium-high heat.',
    'Cook the patties for 4-5 minutes on each side or until your preferred doneness.',
    'Add cheese slices on top during the last minute of cooking.',
    'Toast the burger buns for a minute.',
    'Assemble the burgers with lettuce, tomato, onion, and your favorite condiments.',
    'Serve immediately.',
  ],
  cookingTerms: [
    { term: 'Doneness', definition: 'The degree of cooking meat, from rare to well-done' },
    { term: 'Toast', definition: 'To brown by direct exposure to heat' },
  ]
};

// Daily recommended calorie intake - this would normally be personalized based on user data
const dailyCalories = 2000;

const Recipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe] = useState(mockRecipe);
  const [isBookmarked, setIsBookmarked] = useState(recipe.bookmarked);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  
  // Mock collections data
  const [collections, setCollections] = useState([
    { id: '1', name: 'Favorites' },
    { id: '2', name: 'Weekend Meals' },
    { id: '3', name: 'Quick Lunches' },
  ]);
  
  // New collection input state
  const [newCollection, setNewCollection] = useState('');

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  const addToCollection = () => {
    if (selectedCollection) {
      console.log(`Added to collection: ${selectedCollection}`);
      // Here we would update the backend with this information
    }
  };
  
  const createCollection = () => {
    if (newCollection.trim()) {
      const newId = (collections.length + 1).toString();
      const newCollectionItem = { id: newId, name: newCollection.trim() };
      setCollections([...collections, newCollectionItem]);
      setSelectedCollection(newId);
      setNewCollection('');
    }
  };

  // Extract the numerical value from calories for the chart
  const caloriesValue = parseInt(recipe.nutritionalInfo.calories.replace(/[^0-9]/g, ''));
  const caloriesPercentage = Math.round((caloriesValue / dailyCalories) * 100);
  
  // Data for pie chart
  const nutritionData = [
    { name: 'This Recipe', value: caloriesValue, color: '#9b87f5' },
    { name: 'Remaining', value: dailyCalories - caloriesValue, color: '#E5DEFF' },
  ];

  return (
    <div className="pb-16">
      <div className="relative">
        <img 
          src={`/images/${recipe.image}`}
          alt={recipe.title} 
          className="w-full h-64 object-cover"
        />
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-4 left-4 bg-white/80 rounded-full"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={20} />
        </Button>
        <div className="absolute top-4 right-4 flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className={`bg-white/80 rounded-full ${isBookmarked ? 'text-primary' : ''}`}
                onClick={toggleBookmark}
              >
                <Bookmark size={20} className={isBookmarked ? 'fill-primary text-primary' : ''} />
              </Button>
            </PopoverTrigger>
            {isBookmarked && (
              <PopoverContent className="w-60">
                <div className="space-y-2">
                  <h4 className="font-medium">Save to Collection</h4>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedCollection || ''}
                    onChange={(e) => setSelectedCollection(e.target.value)}
                  >
                    <option value="">Select a collection</option>
                    {collections.map(col => (
                      <option key={col.id} value={col.id}>{col.name}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="New collection"
                      className="flex-1 p-2 border rounded-md"
                      value={newCollection}
                      onChange={(e) => setNewCollection(e.target.value)}
                    />
                    <Button size="sm" onClick={createCollection}>
                      <Plus size={16} />
                    </Button>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={addToCollection} 
                    disabled={!selectedCollection}
                  >
                    Add
                  </Button>
                </div>
              </PopoverContent>
            )}
          </Popover>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="bg-white/80 rounded-full"
          >
            <Share size={20} />
          </Button>
        </div>
      </div>

      <div className="mobile-container">
        <h1 className="text-2xl font-bold mt-4 mb-2">{recipe.title}</h1>
        
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <div className="mr-4">⏱️ {recipe.cookTime}</div>
          <div className="mr-4">🔥 {recipe.calories}</div>
          <div>👨‍🍳 {recipe.difficulty}</div>
        </div>
        
        {/* Allergens section */}
        {recipe.allergens && recipe.allergens.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Contains:</p>
            <div className="flex flex-wrap gap-2">
              {recipe.allergens.map((allergen, index) => (
                <Badge key={index} variant="outline">{allergen}</Badge>
              ))}
            </div>
          </div>
        )}

        <Tabs defaultValue="ingredients">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ingredients" className="mt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Servings</span>
                <span className="font-medium">{recipe.servings}</span>
              </div>
              
              {recipe.ingredients.map((ing, index) => (
                <div key={index} className="flex justify-between py-2 border-b">
                  <span>{ing.name}</span>
                  <span className="font-medium">{ing.amount}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="instructions" className="mt-4">
            <ol className="space-y-4">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex">
                  <div className="mr-4 min-w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                    {index + 1}
                  </div>
                  <p>
                    {step.split(' ').map((word, wordIndex) => {
                      const cookingTerm = recipe.cookingTerms?.find(term => 
                        term.term.toLowerCase() === word.toLowerCase().replace(/[.,!?]/g, '')
                      );
                      
                      if (cookingTerm) {
                        return (
                          <TooltipProvider key={wordIndex}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="underline decoration-dotted cursor-help">
                                  {word}{' '}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                {cookingTerm.definition}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        );
                      }
                      return word + ' ';
                    })}
                  </p>
                </li>
              ))}
            </ol>
          </TabsContent>
          
          <TabsContent value="nutrition" className="mt-4">
            <Card className="p-4 mb-4">
              <h3 className="font-medium mb-2">Calories</h3>
              <div className="flex justify-between items-center mb-2">
                <span>{caloriesValue} kcal</span>
                <span className="text-gray-500 text-sm">{caloriesPercentage}% of daily intake</span>
              </div>
              <Progress value={caloriesPercentage} className="h-2 mb-4" />
              
              {/* Calorie distribution chart */}
              <div className="flex justify-center mt-4">
                <ChartContainer
                  config={{
                    recipe: { color: '#9b87f5' },
                    remaining: { color: '#E5DEFF' },
                  }}
                  className="h-40"
                >
                  <PieChart>
                    <Pie
                      data={nutritionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {nutritionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                  </PieChart>
                </ChartContainer>
              </div>
              
              <div className="flex justify-between text-xs text-center mt-4 text-gray-500">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary mb-1"></div>
                  <span>This Recipe</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#E5DEFF] mb-1"></div>
                  <span>Daily Recommendation</span>
                </div>
              </div>
            </Card>
            
            <div className="space-y-3">
              {Object.entries(recipe.nutritionalInfo).map(([key, value]) => (
                key !== 'calories' && (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <span className="capitalize">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                )
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="info" className="mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Cooking Terms</h3>
                <div className="space-y-2">
                  {recipe.cookingTerms?.map((term, index) => (
                    <div key={index} className="flex justify-between py-2 border-b">
                      <span>{term.term}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Info size={16} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {term.definition}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Recipe;
