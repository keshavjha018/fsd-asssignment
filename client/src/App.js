import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ProtectRoute } from './Utils/ProtectRoute';

import { 
  Project, 
  ProjectPreview, 
  Auth, 
  Profile 
} from "./Pages"

import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <div>
        <Toaster
          position="bottom-left"
          containerStyle={{
            zIndex: 9999 // For the container
           }}
          toastOptions={{
            success: {
              theme: {
                primary: '#4aed88',
              },
            },
          }}
        ></Toaster>
      </div>
      
      <Router>
        <Routes>

          <Route path="/" element={<ProtectRoute> <Project /> </ProtectRoute>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<ProtectRoute> <Profile /> </ProtectRoute>} />
          <Route path="/projects/:id" element={<ProtectRoute> <ProjectPreview /> </ProtectRoute>} />

        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;