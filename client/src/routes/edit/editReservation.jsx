import styled from "styled-components";
import { useLoaderData, Form, redirect, useNavigate } from "react-router-dom";
import TableSelect from "../../components/TableSelect";
import Title from "../../components/Title";
import { getReservation, postUpdateReservation } from "../../utils/api";

export async function loader({ params }) {
  const reservation = await getReservation(params.id);
  return reservation;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  let updates = Object.fromEntries(formData);

  delete updates.reopen;

  if (formData.get("reopen") === "true") {
    updates.status = "pending";
  }

  console.log(updates);

  await postUpdateReservation(params.id, updates);
  return redirect(`/reservations`);
}

export default function EditReservation() {
  const reservation = useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      <Title>Foglalás szerkesztése</Title>
      <StyledForm method="post" id="edit-order-form">
        <Input
          disabled={reservation.status === "rejected"}
          placeholder="Name"
          aria-label="Name"
          type="text"
          name="name"
          defaultValue={reservation.name}
        />
        <Input
          disabled={reservation.status === "rejected"}
          aria-label="Date"
          type="date"
          name="date"
          defaultValue={reservation.date}
        />
        <Input
          disabled={reservation.status === "rejected"}
          aria-label="Time"
          type="time"
          name="time"
          defaultValue={reservation.time}
        />
        <Input
          disabled={reservation.status === "rejected"}
          className="people"
          aria-label="Number of people"
          type="number"
          name="numberOfPeople"
          defaultValue={reservation.numberOfPeople}
        />
        <TableSelect
          disabled={reservation.status === "rejected"}
          aria-label="Table"
          name="table"
          selectedTable={reservation.table}
          reservationId={reservation.id}
        />

        <Button disabled={reservation.status === "rejected"} type="submit">
          Mentés
        </Button>

        <Button
          disabled={reservation.status === "rejected"}
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Mégse
        </Button>

        {reservation.status === "rejected" && (
          <>
            <Button type="submit">Újranyit</Button>
            <input
              type="hidden"
              name="reopen"
              value={reservation.status === "rejected"}
            />
          </>
        )}
      </StyledForm>
    </>
  );
}

const StyledForm = styled(Form)`
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  padding: 4px;
  font-size: 16px;
  border-radius: 16px;
  text-align: center;

  &.people {
    max-width: 48px;
    min-width: 48px;
  }
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  background-color: black;
  color: white;
  padding: 16px;
  border-radius: 16px;
  margin-left: 16px;

  &:disabled {
    opacity: 50%;
  }
`;
