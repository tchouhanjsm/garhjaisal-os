/**
 * Invoice Constants
 */

const InvoiceStatus = Object.freeze({
  DRAFT: "DRAFT",
  FINALIZED: "FINALIZED",
  PAID: "PAID",
  CANCELLED: "CANCELLED",
});

const InvoiceType = Object.freeze({
  BOOKING: "BOOKING",
  WALK_IN: "WALK_IN",
  MANUAL: "MANUAL",
});

const InvoiceCategory = Object.freeze({
  ROOM: "ROOM",
  BREAKFAST: "BREAKFAST",
  FOOD: "FOOD",
  BEVERAGE: "BEVERAGE",
  DESERT_SAFARI: "DESERT_SAFARI",
  CAMEL_SAFARI: "CAMEL_SAFARI",
  TRANSPORT: "TRANSPORT",
  PICKUP: "PICKUP",
  DROPOFF: "DROPOFF",
  EXTRA_BED: "EXTRA_BED",
  LAUNDRY: "LAUNDRY",
  DISCOUNT: "DISCOUNT",
  MISC: "MISC",
});

const InvoiceUnit = Object.freeze({
  NIGHT: "Night",
  ROOM: "Room",
  PERSON: "Person",
  MEAL: "Meal",
  TRIP: "Trip",
  ITEM: "Item",
  SERVICE: "Service",
  PIECE: "Piece",
  HOUR: "Hour",
});
