export const constraints = {
  title: {
    presence: true,
    format: {
      pattern: "[^<>{}()@#]+",
      message: "Invalid Characters!",
    },
    length: { minimum: 2 },
  },
  yourUrl: {
    url: true,
    presence: true,
    format: {
      pattern: "[^<>{}]+",
      message: "Invalid Characters!",
    },
  },
  description: {
    presence: true,
    length: { minimum: 5 },
    format: {
      pattern: "[^<>{}@#]+",
      message: "Invalid Characters!",
    },
  },
  price: {
    format: {
      pattern: "[+]?([0-9]*[.])?[0-9]+",
      message: "needs to be a valid be a number!!",
    },
    numericality: {
      onlyInteger: false,
    },
  },
};
