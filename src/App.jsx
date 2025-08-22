import { HashRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './pages/Layout'
import { HomePage } from './pages/HomePage'
import AboutMe from './pages/AboutMe'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import SiemensGallery from './pages/SiemensGallery'
import Experience from './pages/Experience'
import Education from './pages/Education'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/siemensgallery" element={<SiemensGallery />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}