const csvwriter = require("csv-writer");

var createCsvWriter = csvwriter.createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: "data.csv",
  header: [
    { id: "firstName", title: "FIRSTNAME" },
    { id: "lastName", title: "LASTNAME" },
    { id: "purchasePrice", title: "PURCHESPRICE" },
    { id: "paymentsMade", title: "PAYMENTSMETHOD" },
  ],
});

data = [
  {
    firstName: "John",
    lastName: "Bailey",
    purchasePrice: 1000,
    paymentsMade: 100,
  },
  {
    firstName: "Leonard",
    lastName: "Clark",
    purchasePrice: 1000,
    paymentsMade: 150,
  },
  {
    firstName: "Phil",
    lastName: "Knox",
    purchasePrice: 1000,
    paymentsMade: 200,
  },
  {
    firstName: "Sonia",
    lastName: "Glover",
    purchasePrice: 1000,
    paymentsMade: 250,
  },
  {
    firstName: "Adam",
    lastName: "Mackay",
    purchasePrice: 1000,
    paymentsMade: 350,
  },
  {
    firstName: "Lisa",
    lastName: "Ogden",
    purchasePrice: 1000,
    paymentsMade: 400,
  },
  {
    firstName: "Elizabeth",
    lastName: "Murray",
    purchasePrice: 1000,
    paymentsMade: 500,
  },
  {
    firstName: "Caroline",
    lastName: "Jackson",
    purchasePrice: 1000,
    paymentsMade: 350,
  },
  {
    firstName: "Kylie",
    lastName: "James",
    purchasePrice: 1000,
    paymentsMade: 900,
  },
  {
    firstName: "Harry",
    lastName: "Peake",
    purchasePrice: 1000,
    paymentsMade: 1000,
  },
];

csvWriter
  .writeRecords(data)
  .then(() => console.log("Data uploaded into csv successfully"));
