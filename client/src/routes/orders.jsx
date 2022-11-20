import { useLoaderData } from "react-router-dom";
import ReservationList from "../components/ReservationList";
import Title from "../components/Title";
import { getAllReservations } from "../utils/api";

export async function loader() {
  const reservations = await getAllReservations();
  return reservations;
}

export default function Orders() {
  const reservations = useLoaderData();

  return (
    <>
      <Title>Rendelések</Title>
      <ReservationList
        reservations={reservations?.filter((reservation) => {
          if (reservation.status === "rejected") return false;
          if (reservation.status === "pending") return false;
          if (reservation.status === "active") return true;
          return false;
        })}
        ordersPage
      />
    </>
  );
}
