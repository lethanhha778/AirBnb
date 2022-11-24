import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <div className="wrapper-page home-layout">
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
