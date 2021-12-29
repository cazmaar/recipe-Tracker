import moment from "moment";

let isoDate = "2021-09-19T05:30:00.000Z";

let newDate = moment.utc(isoDate).format("MM/DD/YY");
console.log("converted date", newDate); // 09/23/21

// let newDate2 = moment.utc(isoDate).format("MMM Do, YYYY");
// console.log("converted date", newDate2); // Sept 24, 2021

let isoDate1 = "2021-09-18T05:30:00.000Z";

let newDate1 = moment.utc(isoDate1).format("MM/DD/YY");
console.log("converted date", newDate1); // 09/23/21

if(newDate>newDate1){console.log("check", true)}