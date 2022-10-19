import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './components/layout/pages/About';
import Home from './components/layout/pages/Home';
import User from './components/layout/pages/User';
import NotFound from './components/layout/pages/NotFound';
import { AlertProvider } from './context/alert/AlertContext';
import { GHProvider } from './context/github/GithubContext';

function App() {
  return (
    <GHProvider>
      <AlertProvider>
        <Router>
          <div className='flex flex-col justify-between h-screen'>
            <Navbar />
            <main className='container mx-auto px-3 pb-12'>
              <Alert />
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
                <Route
                  path='/user/:login'
                  element={<User />}
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AlertProvider>
    </GHProvider>
  );
}

export default App;
