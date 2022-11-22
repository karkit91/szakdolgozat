const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const {
  getReservations,
  getReservation,
  updateReservation,
  rejectReservation,
  getOrder,
  addOrder,
  removeOrderItem,
  getFreeTables,
  getMenu,
} = require("./data.js");

app.use(cors());
app.use(express.json());

app.get("/reservations/:reservationId", (req, res) => {
  res.send(getReservation(req.params.reservationId));
});

app.post("/reservations/:reservationId", (req, res) => {
  updateReservation(req.params.reservationId, req.body);
  res.sendStatus(200);
});

app.post("/reservations/:reservationId/reject", (req, res) => {
  rejectReservation(req.body.id);
  res.sendStatus(200);
});

app.get("/reservations", (req, res) => {
  res.send(getReservations());
});

app.get("/orders/:id", (req, res) => {
  res.send(getOrder(req.params.id));
});

app.post("/orders/:id/add", (req, res) => {
  res.send(addOrder(req.body));
});

app.post("/orders/:id/delete", (req, res) => {
  res.send(removeOrderItem(req.body.id, req.params.id));
});

app.get("/freetables/:id", (req, res) => {
  res.send(getFreeTables(req.params.id));
});

app.get("/menu", (req, res) => {
  res.send(getMenu());
});

app.listen(port);
