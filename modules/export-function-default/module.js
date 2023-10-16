export default {
  sum(x, y) {
    return x + y;
  },
  multiple(x, y) {
    return x * y;
  },
  divide(x, y) {
    return x / y;
  },
  subtraction(x, y) {
    return x - y;
  },
  summary: {
    sum:'Adding multiple numbers',
    multiple:'Multipy multiple numbers',
    divide:'Divide one number by another',
    subtraction:'Minus one number from another',
  }
};


//or
// const sum = (x, y) => {
//   return x+y
// }
// const multiple = (x, y) => {
//   return x*y
// }
// const divide = (x, y) => {
//   return x/y
// }
// const subtraction = (x, y) => {
//   return x-y
// }

// export default {
//   sum,
//   multiple,
//   divide,
//   subtraction
// }