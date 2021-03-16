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
  },
  description: {
    presence: true,
    format: {
      pattern: "[^<>{}()@#]+",
      message: "Invalid Characters!",
    },
  },
  price: {
    numericality: {
      onlyInteger: false,
      greaterThan: 0,
      lessThanOrEqualTo: 1000000,
      noStrings: true,
    },
  },
};
