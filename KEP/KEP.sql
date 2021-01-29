-- https://dbdiagram.io/d/5ff9e09180d742080a35a3f4
DROP TABLE IF EXISTS "customer", "estimator", "customerAddress", "address", "room", "roomType", "bid", "jobItem", "jobUnit", "jobDetails", "finish"
CASCADE;
CREATE TABLE "customer"
(
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "email" varchar,
  "phone" varchar
);

CREATE TABLE "estimator"
(
  "id" SERIAL PRIMARY KEY,
  "full_name" varchar,
  "email" varchar,
  "phone" varchar
);

CREATE TABLE "address"
(
  "id" SERIAL PRIMARY KEY,
  "address" varchar,
  "address2" varchar,
  "zip" varchar,
  "city" varchar
);

CREATE TABLE "customerAddress"
(
  "id" SERIAL PRIMARY KEY,
  "customer_id" int,
  "address_id" int
);

CREATE TABLE "room"
(
  "id" SERIAL PRIMARY KEY,
  "bid_id" int UNIQUE,
  "room_name" varchar,
  "roomType" varchar
);

CREATE TABLE "roomType"
(
  "subtype" varchar PRIMARY KEY,
  "basetype" varchar
);

CREATE TABLE "bid"
(
  "id" SERIAL PRIMARY KEY,
  "customerAddress_id" int,
  "date" date,
  "estimator_id" int UNIQUE
);

CREATE TABLE "jobUnit"
(
  "unitKey" varchar PRIMARY KEY,
  "unitTitle" varchar
);

CREATE TABLE "jobDetails"
(
  "jobKey" varchar PRIMARY KEY,
  "jobTitle" varchar,
  "categoryKey" varchar,
  "categoryTitle" varchar
);

CREATE TABLE "finish"
(
  "finishKey" varchar PRIMARY KEY,
  "finishTitle" varchar
);

CREATE TABLE "jobItem"
(
  "id" SERIAL PRIMARY KEY,
  "room_id" int,
  "jobKey" varchar,
  "units" varchar,
  "quantity" float8,
  "coats" int,
  "finish" varchar
);

ALTER TABLE "customerAddress" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("id");

ALTER TABLE "customerAddress" ADD FOREIGN KEY ("address_id") REFERENCES "address" ("id");

ALTER TABLE "bid" ADD FOREIGN KEY ("id") REFERENCES "room" ("bid_id");

ALTER TABLE "room" ADD FOREIGN KEY ("roomType") REFERENCES "roomType" ("subtype");

ALTER TABLE "bid" ADD FOREIGN KEY ("customerAddress_id") REFERENCES "customerAddress" ("id");

ALTER TABLE "estimator" ADD FOREIGN KEY ("id") REFERENCES "bid" ("estimator_id");

ALTER TABLE "jobItem" ADD FOREIGN KEY ("room_id") REFERENCES "room" ("id");

ALTER TABLE "jobItem" ADD FOREIGN KEY ("jobKey") REFERENCES "jobDetails" ("jobKey");

ALTER TABLE "jobItem" ADD FOREIGN KEY ("units") REFERENCES "jobUnit" ("unitKey");

ALTER TABLE "jobItem" ADD FOREIGN KEY ("finish") REFERENCES "finish" ("finishKey");
