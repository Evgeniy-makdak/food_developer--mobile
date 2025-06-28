import { createBrowserRouter } from "react-router";
import { Booking, Layout, Menu, Basket, Order, PayInfo } from "../../pages";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Booking />,
      },
      {
        path: "menu",
        element: <Menu />,
      },

      {
        path: "profile",
        element: <div>Профиль - страница в разработке</div>,
      },
    ]
  },

  {
    path: "baskets",
    element: <Basket />,
  },
  {
    path: "order",
    element: <Order />,
  },
  {
    path: "pay",
    element: <PayInfo />,
  },
]);

export default router;
