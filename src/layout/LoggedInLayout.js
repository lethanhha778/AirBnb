import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackToTop from '../components/BackToTop';

const HomeLayout = () => {
  localStorage.removeItem('urlRegister')
  return (
    <div className="wrapper-page home-layout">
      <Header />
      <Outlet />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default HomeLayout;
