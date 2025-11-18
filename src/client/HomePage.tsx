import Navbar from ".//Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-orange-50">
      <Navbar />

      <div className="pt-32 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Text */}
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Turn Your <span className="text-orange-500">Ingredients</span>  
            <br />Into Amazing Dishes.
          </h1>
          <p className="text-gray-600 text-lg">
            Upload a photo of your ingredients and let FoodMind suggest delicious recipes.
          </p>

          <div className="space-x-4">
            <a href="/signup" className="px-6 py-3 bg-orange-500 text-white rounded-xl shadow-md hover:scale-105 transition">Get Started</a>
            <a href="#demo" className="px-6 py-3 border rounded-xl hover:bg-white transition">Try Demo</a>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="flex-1">
          <img 
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
