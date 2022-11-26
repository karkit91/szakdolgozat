import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Index from "./routes/index";
import Reservations, {
  loader as reservationsLoader,
  action as reservationsAction,
} from "./routes/reservations";
import EditReservation, {
  action as editReservationAction,
  loader as editReservationLoader,
} from "./routes/edit/editReservation";
import { action as rejectReservation } from "./routes/delete/deleteReservation";
import Orders, { loader as ordersLoader } from "./routes/orders";
import AddOrder, { loader as addOrderLoader } from "./routes/add/addOrder";
import ErrorPage from "./error-page";
import { store } from "./store/store";
import { Provider } from "react-redux";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        children: [
          {
            path: "reservations",
            element: <Reservations />,
            loader: reservationsLoader,
            action: reservationsAction,
          },
          {
            path: "reservations/:id/edit",
            element: <EditReservation />,
            loader: editReservationLoader,
            action: editReservationAction,
          },
          {
            path: "reservations/:id/reject",
            action: rejectReservation,
          },
          { path: "orders", element: <Orders />, loader: ordersLoader },
          {
            path: "orders/:id/add",
            element: <AddOrder />,
            loader: addOrderLoader,
          },
          { index: true, element: <Index /> },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
