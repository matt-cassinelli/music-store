import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import SoundsPage from "./pages/SoundsPage";
import BasketPage from "./pages/BasketPage";
import ErrorPage from "./pages/ErrorPage";
import Header from './components/Header';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SoundsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/services",
    element: <ServicesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/basket",
    element: <BasketPage />,
    errorElement: <ErrorPage />,
  },
]);

// [idea]
// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     children: [
//       {
//         path: "/",
//         element: <SoundsPage />,
//         errorElement: <ErrorPage />,
//       },
//       ...
//   },
// ]);

export default function App() {
  return <>
    <Header />
    <RouterProvider router={router} />
  </>;
}