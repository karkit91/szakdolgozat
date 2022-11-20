export const getFreeTables = async (reservationId) =>
  fetch(`http://localhost:3001/freetables/${reservationId}`).then((data) =>
    data.json()
  );

export const getAllReservations = async () =>
  (await fetch("http://localhost:3001/reservations")).json();

export const getReservation = async (reservationId) =>
  (await fetch(`http://localhost:3001/reservations/${reservationId}`)).json();

export const postUpdateReservation = async (id, body) =>
  fetch(`http://localhost:3001/reservations/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const rejectReservation = async (id) =>
  fetch(`http://localhost:3001/reservations/${id}/reject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });

export const postAddItemToReservation = (reservationId, body) =>
  fetch(`http://localhost:3001/orders/${reservationId}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const removeItemFromReservation = (reservationId, itemId) =>
  fetch(`http://localhost:3001/orders/${reservationId}/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemId }),
  });

export const getOrder = async (id) =>
  (await fetch(`http://localhost:3001/orders/${id}`)).json();

export const getMenu = async () =>
  (await fetch(`http://localhost:3001/menu`)).json();
