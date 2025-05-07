import logo from './logo.svg';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Routes, Route} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import PrivateComponent from './components/private-component';
import Home from './pages/home';
import Catalog from './pages/catalog';
import EventDetailPage from './pages/eventDetailPage';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import MenuManagement from './pages/dashboard/MenuManagement';
// import DashboardMain from './pages/dashboard/main';

function App() {
  return (
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path="/event/:eventId" element={<EventDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
  );
}

export default App;
