import Navbar from "./components/Navbar";
import HomeHero from "./components/HomeHero";
import Info from "./components/Info";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Info/>
      <Navbar/>
      <HomeHero/> 
      <Footer/>

    </div>
  )
}

export default App
