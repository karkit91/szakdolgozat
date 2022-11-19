import styled from "styled-components";
import { useLoaderData } from "react-router-dom";
import { switchReservationStatus, activateReservation } from "../data";
import ReservationsList from "../components/ReservationList";

export async function loader() {
  const reservationsResponse = await fetch(
    "http://localhost:3001/reservations"
  );

  const reservationsJson = await reservationsResponse.json();

  return reservationsJson;
}

export async function action({ request }) {
  let formData = await request.formData();

  if (formData.get("acceptButton")) {
    await fetch(`http://localhost:3001/reservations/${formData.get("id")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "accepted",
      }),
    });
  }

  if (formData.get("activateButton")) {
    if (!formData.get("table")) {
      window.alert("Válasszon egy asztalt");
      return;
    }

    await fetch(`http://localhost:3001/reservations/${formData.get("id")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "active",
        table: formData.get("table"),
      }),
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

const Title = styled.h1`
  padding-bottom: 16px;
`;
