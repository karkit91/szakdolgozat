import { redirect } from "react-router-dom";
import { deleteReservation } from "../../data";

export async function action({ params }) {
  await fetch(`http://localhost:3001/reservations/${params.id}/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: params.id,
    }),
  });

  await deleteReservation(params.id);
  return redirect("/reservations");
}
