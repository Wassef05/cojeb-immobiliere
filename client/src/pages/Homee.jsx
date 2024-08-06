import HomeHeader from "../components/AddedComponents/HomeHeader";
import Card1 from "../components/AddedComponents/Card1";
import Card2 from "../components/AddedComponents/Card2";
import Card3 from "../components/AddedComponents/Card3";
import Contact from "../components/AddedComponents/Contatc";
import Map from "../components/AddedComponents/Map";
import Footer from "../components/Footer";
import Carousel from "../components/AddedComponents/Carousel"
import TermineeProjects from "../components/ProjectsTermines";
import EnCoursProjects from "../components/ProjectsEnCours";
import StateCard from "../components/AddedComponents/StateCardAbout";
import { useEffect } from 'react'



function Homee() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="App">
      <HomeHeader/>
      <div>
        <Card1/>
        <TermineeProjects/>
        <EnCoursProjects/> 
        <Card2/>
        <Card3/>
        <Carousel/>
        <StateCard/>
        <Contact/>
        <Map/>
        <Footer/>
       </div>
    </div>
  );
}

export default Homee;
