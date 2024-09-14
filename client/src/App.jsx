import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import CreateProject from './pages/CreateProject'
import UpdateProject from './pages/UpdateProject'
import ProjectPage from './pages/ProjectPage'
import SearchProject from './pages/SearchProject'
import Homee from './pages/Homee'
import About from './pages/About'
import Contact from './pages/Contact'
import NavbarComp from './components/NavbarComp'
import ErrorBoundary from './components/ErrorBoundary'; // Importer ErrorBoundary


function App() {
  return (
    <>
      
      <BrowserRouter>
        <NavbarComp />
        {/* <Theme/> */}
        <ErrorBoundary fallback={<p>Une erreur s'est produite. Veuillez réessayer plus tard.</p>}>

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/" element={<Homee />} />
          <Route path='/projects/:id' element={<ProjectPage />}/>
          <Route path='/searchProject?' element={<SearchProject />} />

         
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />


          {/* /---------Private Routes-----------/ */}
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/create_project' element={<CreateProject />} />
            <Route path='/update_project/:id' element={<UpdateProject />} />
          </Route>
        </Routes>
        </ErrorBoundary>

      </BrowserRouter>
    </>
  )
}

export default App
