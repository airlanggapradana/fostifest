import Hero from "@/components/Hero.tsx";
import {Navbar} from "@/components/Navbar.tsx";

function App() {
  return (
    <div className={"min-h-screen bg-white"}>
      <Navbar/>
      <Hero/>
    </div>
  )
}

export default App
