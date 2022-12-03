import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackToTop from '../components/BackToTop';

const HomeLayout = () => {
  return (
    <div className="wrapper-page home-layout">
      <Header></Header>
      <Outlet />
      <Footer></Footer>
      <BackToTop/>
    </div>
  );
};

export default HomeLayout;
