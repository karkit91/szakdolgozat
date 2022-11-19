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
