import styled from "styled-components";
import { Form, useFetcher } from "react-router-dom";
import TableSelect from "./TableSelect";

const getReservationStatus = (reservation) => {
  if (reservation.status === "rejected") return "Elutasítva";
  if (reservation.status === "accepted") return "Elfogadva";
  if (reservation.status === "active") return "Leültetve: ";
  else return "Még nincs elfogadva";
};

export default function ReservationList({
  reservations,
  ordersPage,
  reservationsPage,
}) {
  const fetcher = useFetcher();

  const getReservationPageList = (reservation) => (
    <>
      {reservation.status === "accepted" && (
        <fetcher.Form method="post">
          <input name="id" type="hidden" value={reservation.id} />
          <TableSelect
            selectedTable={reservation.table}
            reservationId={reservation.id}
          />

          <button
            className="btn"
            name="activateButton"
            value="active"
            type="submit"
          >
            {reservation.status === "active" ? "Felállít" : "Leültet"}
          </button>
        </fetcher.Form>
      )}
      {reservation.status === "pending" && (
        <>
          <fetcher.Form method="post">
            <input name="id" type="hidden" value={reservation.id} />
            <button
              className="btn"
              name="acceptButton"
              value="accept"
              type="submit"
            >
              Elfogad
            </button>
          </fetcher.Form>
          <Form
            method="post"
            action={`${reservation.id}/reject`}
            onSubmit={(event) => {
              if (!window.confirm("Valóban el szeretnéd utasítani?"))
                event.preventDefault();
            }}
          >
            <button type="submit" className="btn">
              Elutasít
            </button>
          </Form>
        </>
      )}

      <Form action={`${reservation.id}/edit`}>
        <button className="btn" type="submit">
          Szerkeszt
        </button>
      </Form>
    </>
  );

  return (
    <ul>
      {reservations?.map((reservation) => {
        return (
          <ReservationsListItem key={reservation.id}>
            <ReservationDetails>
              <div>{`${reservation.name} (${reservation.numberOfPeople} fő)`}</div>
              <DateTimeInput
                type="datetime-local"
                value={`${reservation.date} ${reservation.time}`}
                readOnly
              />
              <StatusDiv reservationStatus={reservation.status}>
                {getReservationStatus(reservation)}
                {reservation.status === "active"
                  ? `${reservation.table} asztalhoz`
                  : ""}
              </StatusDiv>
              <div>Telefonszám: {reservation.phone}</div>
              <div>Email: {reservation.email}</div>
            </ReservationDetails>

            <ButtonContainer>
              {reservationsPage ? getReservationPageList(reservation) : null}
              {ordersPage ? (
                <Form action={`${reservation.id}/add`}>
                  <button className="btn" type="submit">
                    Rendelések felvétele
                  </button>
                </Form>
              ) : null}
            </ButtonContainer>
          </ReservationsListItem>
        );
      })}
    </ul>
  );
}

const ReservationsListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background-color: #efc83b;
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 16px;
`;

const ReservationDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  button {
    all: unset;
    cursor: pointer;
    background-color: black;
    color: white;
    padding: 16px;
    border-radius: 16px;
    margin-left: 16px;
  }
`;

const DateTimeInput = styled.input`
  padding: 4px;
  font-size: 16px;
  border-radius: 16px;
  text-align: center;
`;

const StatusDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  padding: 16px;
  background-color: ${({ reservationStatus }) => {
    if (reservationStatus === "pending") return "#ff7033";
    if (reservationStatus === "accepted") return "#13d49d";
    if (reservationStatus === "active") return "#38ff15";
    return "black";
  }};
`;
