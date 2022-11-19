import styled from "styled-components";
import { useLoaderData } from "react-router-dom";
import { getReservations } from "../data";
import ReservationList from "../components/ReservationList";

export async function loader() {
  const reservationsResponse = await fetch(
    "http://localhost:3001/reservations"
  );

  const reservationsJson = await reservationsResponse.json();

  return reservationsJson;
}

export default function Orders() {
  const reservations = useLoaderData();

  return (
    <>
      <Title>Rendelések</Title>
      <ReservationList reservations={reservations} ordersPage />
    </>
  );
}

const Title = styled.h1`
  padding-bottom: 16px;
`;
