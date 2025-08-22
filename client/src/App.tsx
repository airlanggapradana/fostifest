import Hero from "@/components/Hero.tsx";
import {Navbar} from "@/components/Navbar.tsx";
import Categories from "@/components/Categories.tsx";
import Competitions from "@/components/Competitions.tsx";
import Stats from "@/components/Stats.tsx";
import Sponsors from "@/components/Sponsors.tsx";
import MediaPartners from "@/components/MediaPartners.tsx";
import Footer from "@/components/Footer.tsx";
import {CompetitionContext} from "@/hooks/context.ts";
import {useGetAllComps} from "@/utils/query.ts";
import FAQ from "@/components/FAQ.tsx";
import LoadingPage from "@/components/Loading.tsx";

function App() {
  const {data, isLoading, error} = useGetAllComps();
  const loadingText = ['We are preparing something from the kitchen...', 'Fetching data...', 'Preparing the stage...', 'Getting things ready...'];

  if (isLoading) return <LoadingPage
    loadingText={loadingText[Math.floor(Math.random() * loadingText.length)]}
    size={'lg'}
  />;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;
  if (!data) return <div className="text-center text-gray-400">No data available</div>;
  return (
    <CompetitionContext.Provider value={data}>
      <main className={"min-h-screen bg-white w-full overflow-hidden"}>
        <Navbar/>
        <Hero/>
        <Stats/>
        <Categories/>
        <Competitions/>
        <FAQ/>
        <Sponsors/>
        <MediaPartners/>
        <Footer/>
      </main>
    </CompetitionContext.Provider>
  )
}

export default App
