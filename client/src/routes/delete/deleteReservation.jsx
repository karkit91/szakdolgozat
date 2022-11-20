import { redirect } from "react-router-dom";
import { rejectReservation } from "../../utils/api";

export async function action({ params }) {
  await rejectReservation(params.id);
  return redirect("/reservations");
}
