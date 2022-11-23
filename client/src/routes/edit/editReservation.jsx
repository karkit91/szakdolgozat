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
  const updates = Object.fromEntries(formData);
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
          placeholder="Name"
          aria-label="Name"
          type="text"
          name="name"
          defaultValue={reservation.name}
        />
        <Input
          aria-label="Date"
          type="date"
          name="date"
          defaultValue={reservation.date}
        />
        <Input
          aria-label="Time"
          type="time"
          name="time"
          defaultValue={reservation.time}
        />
        <TableSelect
          aria-label="Table"
          name="table"
          selectedTable={reservation.table}
          reservationId={reservation.id}
        />

        <Button type="submit">Mentés</Button>
        <Button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Mégse
        </Button>
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
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  background-color: black;
  color: white;
  padding: 16px;
  border-radius: 16px;
  margin-left: 16px;
`;
