import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';

function WithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default WithNavbar;