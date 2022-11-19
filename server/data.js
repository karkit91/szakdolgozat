const fs = require("fs");

let rawMenu = fs.readFileSync("menu.json");
let menu = JSON.parse(rawMenu);

let rawReservations = fs.readFileSync("reservations.json");
let reservations = JSON.parse(rawReservations);

let rawOrders = fs.readFileSync("orders.json");
let orders = JSON.parse(rawOrders);

// // Reservation

exports.getReservation = (id) =>
  reservations.find((reservation) => reservation.id === id);

exports.getReservations = () => reservations;

exports.updateReservation = (id, updates) => {
  const index = reservations.findIndex((item) => item.id === id);
  if (index > -1) {
    reservations[index] = { ...reservations[index], ...updates };

    let data = JSON.stringify(reservations);
    fs.writeFileSync("reservations.json", data);
  }
};

exports.deleteReservation = (id) => {
  this.updateReservation(id, { status: "rejected" });
};

exports.getOrder = (id) =>
  orders.filter((order) => {
    return order.reservationId === id;
  });

exports.addOrder = (order) => {
  orders.push(order);
  let data = JSON.stringify(orders);
  fs.writeFileSync("orders.json", data);
};

exports.removeOrderItem = (id, reservationId) => {
  const index = orders.findLastIndex(
    (order) => order.reservationId === reservationId && order.id === id
  );

  if (index > -1) {
    orders.splice(index, 1);
    let data = JSON.stringify(orders);
    fs.writeFileSync("orders.json", data);
  }
};

exports.getReservedTables = (id) => {
  const freeTables = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const reservation = reservations.find((reservation) => reservation.id === id);

  reservations.forEach((actualReservation) => {
    if (
      actualReservation.date === reservation.date &&
      actualReservation.time === reservation.time &&
      actualReservation.table
    ) {
      console.log("A");
      const index = freeTables.findIndex(
        (table) => table === actualReservation.table
      );

      console.log("index", index);
      freeTables.splice(index, 1);
    }
  });

  return freeTables;
};
// // Menu

// export function getMenuItem(id) {
//   return new Promise((resolve) => {
//     resolve(menu.find((order) => order.id === id));
//   });
// }

// export function getMenu() {
//   return new Promise((resolve) => {
//     resolve(menu);
//   });
// }
