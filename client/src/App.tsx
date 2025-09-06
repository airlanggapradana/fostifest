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
import Timeline from "@/components/Timeline.tsx";
import About from "@/components/About.tsx";
import SEO from "@/hooks/SEO.tsx";
import {VITE_BASE_URL} from "@/env.ts";
import home from "@/assets/home.png"

function App() {
  const {data, isLoading, error} = useGetAllComps();

  if (isLoading) return <LoadingPage
    size={'sm'}
  />;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;
  if (!data) return <div className="text-center text-gray-400">No data available</div>;
  return (
    <CompetitionContext.Provider value={data}>
      <SEO
        title="FOSTIFEST 2025 | Festival Teknologi & Workshop – FOSTI UMS"
        description="FOSTIFEST 2025 oleh FOSTI UMS: lomba Competitive Programming, Software Development, UI/UX, dan workshop Vue.js. Daftar sekarang!"
        schema={{
          "@context": "https://schema.org",
          "@type": "Event",
          "name": "FOSTIFEST 2025",
          "startDate": "2025-10-20T08:00",
          "endDate": "2025-10-20T17:00",
          "location": {
            "@type": "Place",
            "name": "Universitas Muhammadiyah Surakarta (UMS)",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Jl. A. Yani No.2",
              "addressLocality": "Surakarta",
              "addressRegion": "Central Java",
              "addressCountry": "ID"
            }
          },
          "image": home,
          "url": VITE_BASE_URL
        }}
      />
      <main className={"min-h-screen bg-white w-full overflow-hidden"}>
        <Navbar/>
        <Hero/>
        <Stats/>
        <Categories/>
        <About/>
        <Competitions/>
        <Timeline/>
        <FAQ/>
        <Sponsors/>
        <MediaPartners/>
        <Footer/>
      </main>
    </CompetitionContext.Provider>
  )
}

export default App
