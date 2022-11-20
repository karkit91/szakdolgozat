import { useLoaderData } from "react-router-dom";
import ReservationsList from "../components/ReservationList";
import Title from "../components/Title";
import { getAllReservations, postUpdateReservation } from "../utils/api";

export async function loader() {
  const reservations = await getAllReservations();
  return reservations;
}

export async function action({ request }) {
  let formData = await request.formData();

  if (formData.get("acceptButton")) {
    postUpdateReservation(formData.get("id"), {
      status: "accepted",
    });
    return;
  }

  if (formData.get("activateButton")) {
    if (!formData.get("table")) {
      window.alert("Válasszon egy asztalt");
      return;
    }

    postUpdateReservation(formData.get("id"), {
      status: "active",
      table: formData.get("table"),
    });
  }
}

export default function Reservations() {
  const reservations = useLoaderData();

  return (
    <>
      <Title>Foglalások</Title>
      <ReservationsList
        reservations={reservations?.filter(
          (reservation) => reservation.status !== "rejected"
        )}
        reservationsPage
      />
      <Title>Törölt foglalások</Title>
      <ReservationsList
        reservations={reservations?.filter(
          (reservation) => reservation.status === "rejected"
        )}
        reservationsPage
      />
    </>
  );
}
