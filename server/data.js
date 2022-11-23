const fs = require("fs");

let rawMenu = fs.readFileSync("./data/menu.json");
let menu = JSON.parse(rawMenu);

let rawOrders = fs.readFileSync("./data/orders.json");
let orders = JSON.parse(rawOrders);

let rawTables = fs.readFileSync("./data/tables.json");
let tables = JSON.parse(rawTables);

const readReservationsFromFile = () => {
  let rawReservations = fs.readFileSync("./data/reservations.json");
  return JSON.parse(rawReservations);
};

// // Reservation

exports.getReservation = (id) => {
  const reservations = readReservationsFromFile();
  return reservations.find((reservation) => reservation.id === id);
};

exports.getReservations = () => readReservationsFromFile();

exports.updateReservation = (id, updates) => {
  const reservations = readReservationsFromFile();
  const index = reservations.findIndex((item) => item.id === id);
  if (index > -1) {
    reservations[index] = { ...reservations[index], ...updates };

    let data = JSON.stringify(reservations);
    fs.writeFileSync("./data/reservations.json", data);
  }
};

exports.rejectReservation = (id) => {
  this.updateReservation(id, { status: "rejected" });
};

exports.getOrder = (id) =>
  orders.filter((order) => {
    return order.reservationId === id;
  });

exports.addOrder = (order) => {
  orders.push(order);
  let data = JSON.stringify(orders);
  fs.writeFileSync("./data/orders.json", data);
};

exports.removeOrderItem = (id, reservationId) => {
  const index = orders.findLastIndex(
    (order) => order.reservationId === reservationId && order.id === id
  );

  if (index > -1) {
    orders.splice(index, 1);
    let data = JSON.stringify(orders);
    fs.writeFileSync("./data/orders.json", data);
  }
};

exports.getFreeTables = (id) => {
  const freeTables = tables.tables;
  const reservations = readReservationsFromFile();
  const reservation = reservations.find((reservation) => reservation.id === id);

  reservations.forEach((actualReservation) => {
    if (
      actualReservation.id !== reservation.id &&
      actualReservation.date === reservation.date &&
      actualReservation.time === reservation.time &&
      actualReservation.table
    ) {
      const index = freeTables.findIndex(
        (table) => table === actualReservation.table
      );
      freeTables.splice(index, 1);
    }
  });

  return freeTables;
};

exports.getMenu = () => menu;
