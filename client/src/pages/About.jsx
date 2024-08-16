import React from 'react';
import AboutHeader from '../components/AddedComponents/AboutHeader';
import Carousel3 from '../components/AddedComponents/Carousel3';
import Card3 from '../components/AddedComponents/Card3';
import Newsetter from '../components/AddedComponents/Newsetter';
import Footer from '../components/Footer';
import Card1About from '../components/AddedComponents/Card1About';
import Card2About from '../components/AddedComponents/Card2About';
import { useEffect } from 'react';


export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <AboutHeader />
      
      <Card1About/>
      <Card2About/>
      <Carousel3 />
      <Card3/>
      <Newsetter/>
      <Footer/>
    </div>
  );
}