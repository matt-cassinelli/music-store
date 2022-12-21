import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import ServicesPage from "./pages/ServicesPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import SoundsPage from "./pages/SoundsPage/SoundsPage";
import BasketPage from "./pages/BasketPage";
import ErrorPage from "./pages/ErrorPage";
import Menu from './components/Navbar/Menu';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import './App.css';

const Layout = () => (<>
  <Menu /> {/* [todo] rename to PopoutMenu? */}
  <Navbar />
  <Outlet />
  <Footer />
</>)

const router = createBrowserRouter([{
  element: <Layout />,
  children: [
    {
      path: "/",
      element: <SoundsPage />,
    },
    {
      path: "/sounds",
      element: <SoundsPage />,
    },
    {
      path: "/sounds/:id",
      element: <SoundsPage />,
    },
    {
      path: "/services",
      element: <ServicesPage />,
    },
    {
      path: "/contact",
      element: <ContactPage />,
    },
    {
      path: "/basket",
      element: <BasketPage />,
    },
    {
      path: "/checkout",
      element: <CheckoutPage />,
    },
    {
      path: "*",
      element: <ErrorPage /> 
    }
  ]
}]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}