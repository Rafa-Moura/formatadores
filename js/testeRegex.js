const REGEX_DOUBLE =
  /^(\d{1,3}\.)*([0-9]{3})\,([0-9]{2}$)|^([0-9]{1,3})\,([0-9]{2}$)/g;

const value = "0,01";
console.log(value.match(REGEX_DOUBLE));
console.log(REGEX_DOUBLE.test(value));
