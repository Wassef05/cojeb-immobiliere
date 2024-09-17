import HomeHeader from "../components/AddedComponents/HomeHeader";
import Card1 from "../components/AddedComponents/Card1";
import Card2 from "../components/AddedComponents/Card2";
import Card3 from "../components/AddedComponents/Card3";
import Contact from "../components/AddedComponents/Contatc";
import Map from "../components/AddedComponents/Map";
import Footer from "../components/Footer";
import Carousel from "../components/AddedComponents/Carousel";
import TermineeProjects from "../components/ProjectsTermines";
import EnCoursProjects from "../components/ProjectsEnCours";
import StateCard from "../components/AddedComponents/StateCardAbout";
import ProjetFuture from "../components/ProjetFuture";
import { useEffect } from 'react';
import ErrorBoundary from '../components/ErrorBoundary'; 

function Homee() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App max-w-full overflow-x-hidden">
      <HomeHeader />
      <div>
        <ErrorBoundary fallback={<p>Oops! Erreur dans Card1</p>}>
          <Card1 />
        </ErrorBoundary>
        <ErrorBoundary fallback={<p>Oops! Erreur dans Projects Terminés</p>}>
          <TermineeProjects />
        </ErrorBoundary>
        <ErrorBoundary fallback={<p>Oops! Erreur dans Projects En Cours</p>}>
          <EnCoursProjects />
        </ErrorBoundary>
        <ErrorBoundary fallback={<p>Oops! Erreur dans Projet Futur</p>}>
          <ProjetFuture />
        </ErrorBoundary>
        <ErrorBoundary fallback={<p>Oops! Erreur dans Card2</p>}>
          <Card2 />
        </ErrorBoundary>
        <ErrorBoundary fallback={<p>Oops! Erreur dans Card3</p>}>
          <Card3 />
        </ErrorBoundary>
        <ErrorBoundary fallback={<p>Oops! Erreur dans Carousel</p>}>
          <Carousel />
        </ErrorBoundary>
        <ErrorBoundary fallback={<p>Oops! Erreur dans StateCard</p>}>
          <StateCard />
        </ErrorBoundary>
        <ErrorBoundary fallback={<p>Oops! Erreur dans Contact</p>}>
          <Contact />
        </ErrorBoundary>
        <ErrorBoundary fallback={<p>Oops! Erreur dans Map</p>}>
          <Map />
        </ErrorBoundary>
        <Footer />
      </div>
    </div>
  );
}

export default Homee;
