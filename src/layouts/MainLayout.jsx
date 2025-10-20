import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import './MainLayout.css';
import Header from '../components/Header';  

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;