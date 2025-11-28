import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div className="w-screen h-screen">
      <div className='fixed'>
        <Navbar />
      </div>
      <div className='my-30 mx-20 w-full h-full flex flex-col gap-y-5 sm:text-center max-sm:text-center'>
        <p className='font-bold text-4xl'>Cook More, Eat More, <br/> Think Less.</p>
        <p className='w-1/2 text-sm sm:w-full max-sm:w-full'>Your AI-curated recipe generator, <br/> equipped with nutritional values and diet recommendations for your health.</p>
        <div className=''>
          <button className='border p-2 text-sm cursor-pointer hover:text-orange-500'>
            Try FoodMind free
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
