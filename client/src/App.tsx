import Hero from "@/components/Hero.tsx";
import {Navbar} from "@/components/Navbar.tsx";
import Categories from "@/components/Categories.tsx";
import Competitions from "@/components/Competitions.tsx";

function App() {
  return (
    <div className={"min-h-screen bg-white"}>
      <Navbar/>
      <Hero/>
      <Categories/>
      <Competitions/>
    </div>
  )
}

export default App
