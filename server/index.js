const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const {
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
  getOrder,
  addOrder,
  removeOrderItem,
  getReservedTables,
} = require("./data.js");
const util = require("util");

app.use(cors());
app.use(express.json());

app.get("/reservations/:reservationId", (req, res) => {
  res.send(getReservation(req.params.reservationId));
});

app.post("/reservations/:reservationId", (req, res) => {
  updateReservation(req.params.reservationId, req.body);
  res.sendStatus(200);
});

app.post("/reservations/:reservationId/delete", (req, res) => {
  deleteReservation(req.body.id);
  res.sendStatus(200);
});

app.get("/reservations", (req, res) => {
  res.send(getReservations());
});

app.get("/orders/:id/add", (req, res) => {
  res.send(getOrder(req.params.id));
});

app.post("/orders/:id/add", (req, res) => {
  console.log("post", req.body);
  res.send(addOrder(req.body));
});

app.post("/orders/:id/delete", (req, res) => {
  res.send(removeOrderItem(req.body.id, req.params.id));
});

app.get("/reservedtables/:id", (req, res) => {
  res.send(getReservedTables(req.params.id));
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
