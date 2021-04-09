const validate = require("validate.js");

export const constraints = {
  city: {
    presence: true,
    format: {
      pattern: /^[a-zA-Zs\s]*$/,
      message: "Must be letters only!!",
    },
    length: { minimum: 2 },
  },
  address: {
    presence: true,
    format: {
      pattern: /[^<>{}]+/,
      message: "Invalid Characters",
    },
  },
  state: {
    format: {
      pattern: /^[a-zA-Zs\s]*$/,
      message: "Must be letters only!!",
    },
    length: { minimum: 2, maximum: 8 },
  },
  zipp: {
    format: {
      pattern: "[^<>{}]+",
    },
    length: { minimum: 4, maximum: 8 },
  },
};
