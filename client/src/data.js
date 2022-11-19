const reservations = [
  {
    id: "1",
    name: "Kiss Ferenc",
    date: "2022-12-12",
    time: "19:00",
    approved: false,
    active: true,
    table: null,
  },
  {
    id: "2",
    name: "Benedek Elek",
    date: "2023-02-12",
    time: "17:30",
    approved: false,
    active: false,
    table: null,
  },
  {
    id: "3",
    name: "Benedek Elek",
    date: "2023-02-12",
    time: "17:30",
    approved: false,
    active: false,
    table: null,
  },
  {
    id: "4",
    name: "Benedek Elek",
    date: "2023-02-12",
    time: "17:30",
    approved: false,
    active: false,
    table: null,
  },
  {
    id: "5",
    name: "Benedek Elek",
    date: "2023-02-12",
    time: "17:30",
    approved: false,
    active: false,
    table: null,
  },
  {
    id: "6",
    name: "Benedek Elek",
    date: "2023-02-12",
    time: "17:30",
    approved: false,
    active: false,
    table: null,
  },
  {
    id: "7",
    name: "Benedek Elek",
    date: "2023-02-12",
    time: "17:30",
    approved: false,
    active: false,
    table: null,
  },
  {
    id: "8",
    name: "Benedek Elek",
    date: "2023-02-12",
    time: "17:30",
    approved: false,
    active: false,
    table: null,
  },
  {
    id: "9",
    name: "Benedek Elek",
    date: "2023-02-12",
    time: "17:30",
    approved: false,
    active: false,
    table: null,
  },
];

const menu = [
  {
    type: "Etel",
    menuId: "etel",
    items: [
      {
        id: "1",
        item: "Kolbasz",
        price: "5000",
        quantity: "1",
        unit: "g",
        currency: "Ft",
      },
      {
        id: "2",
        item: "Kenyér",
        price: "5000",
        quantity: "1",
        unit: "kg",
        currency: "Ft",
      },
      {
        id: "3",
        item: "Hamburger",
        price: "5000",
        quantity: "1",
        unit: "kg",
        currency: "Ft",
      },
      {
        id: "4",
        item: "Pogácsa",
        price: "5000",
        quantity: "1",
        unit: "kg",
        currency: "Ft",
      },
    ],
  },
  {
    type: "Ital",
    menuId: "ital",
    items: [
      {
        id: "1",
        item: "Vodka",
        price: "150",
        quantity: "1",
        unit: "ml",
        currency: "Ft",
      },
      {
        id: "2",
        item: "Rum",
        price: "5000",
        quantity: "1",
        unit: "ml",
        currency: "Ft",
      },
      {
        id: "3",
        item: "Kóla",
        price: "5000",
        quantity: "1",
        unit: "ml",
        currency: "Ft",
      },
      {
        id: "4",
        item: "Tea",
        price: "5000",
        quantity: "1",
        unit: "ml",
        currency: "Ft",
      },
    ],
  },
];

// Reservation

export function getReservation(id) {
  return new Promise((resolve) => {
    resolve(reservations.find((reservation) => reservation.id === id));
  });
}

export function getReservations() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(reservations);
    }, 200);
  });
}

export function switchReservationStatus(id) {
  return new Promise((resolve) => {
    const reservation = reservations.find(
      (reservation) => reservation.id === id
    );
    resolve((reservation.approved = !reservation.approved));
  });
}

export function activateReservation(id) {
  return new Promise((resolve) => {
    const reservation = reservations.find(
      (reservation) => reservation.id === id
    );
    resolve((reservation.active = !reservation.active));
  });
}

export function updateReservation(id, updates) {
  return new Promise((resolve) => {
    const reservation = reservations.find(
      (reservation) => reservation.id === id
    );
    reservation.name = updates.name;
    reservation.date = updates.date;
    reservation.time = updates.time;
    reservation.table = updates.table;
    resolve("ok");
  });
}

export function deleteReservation(id) {
  let index = reservations.map((item) => item.id).indexOf(id);
  if (index > -1) {
    reservations.splice(index, 1);
  }
}

// Menu

export function getMenuItem(id) {
  return new Promise((resolve) => {
    resolve(menu.find((order) => order.id === id));
  });
}

export function getMenu() {
  return new Promise((resolve) => {
    resolve(menu);
  });
}
