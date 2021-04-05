const validate = require("validate.js");

export const constraints = {
  email: {
    email: true,
    format: {
      pattern: "[^<>{}]+",
    },
  },
  password: {
    format: {
      pattern: "[^<>{}]+",
      message: "type invalid",
    },
    length: { minimum: 6 },
  },
};
