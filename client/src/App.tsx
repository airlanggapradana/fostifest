import Hero from "@/components/Hero.tsx";
import {Navbar} from "@/components/Navbar.tsx";
import Categories from "@/components/Categories.tsx";
import Competitions from "@/components/Competitions.tsx";
import Stats from "@/components/Stats.tsx";
import Sponsors from "@/components/Sponsors.tsx";
import MediaPartners from "@/components/MediaPartners.tsx";

function App() {
  return (
    <div className={"min-h-screen bg-white w-full"}>
      <Navbar/>
      <Hero/>
      <Stats/>
      <Categories/>
      <Competitions/>
      <Sponsors/>
      <MediaPartners/>
    </div>
  )
}

export default App
