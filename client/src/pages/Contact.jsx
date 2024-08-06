// import React from 'react'
import ContactHeader from '../components/AddedComponents/ContactHeader'
import Form from '../components/AddedComponents/Form'
import Footer from '../components/Footer'
import Newsetter from '../components/AddedComponents/Newsetter'
import { useEffect } from 'react'

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <ContactHeader/>
      <Form/>
      <Newsetter/>
      <Footer/>
      
    </div>
  )
}
