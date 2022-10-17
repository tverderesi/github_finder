import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import About from './components/layout/pages/About';
import Home from './components/layout/pages/Home';
import NotFound from './components/layout/pages/NotFound';
function App() {
  return (
    <Router>
      <div className='flex flex-col justify-between h-screen'>
        <Navbar />
        <main className='container mx-auto px-3 pb-12'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/about'
              element={<About />}
            />
            <Route
              path='/notfound'
              element={<NotFound />}
            />
            <Route
              path='/*'
              element={<NotFound />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
