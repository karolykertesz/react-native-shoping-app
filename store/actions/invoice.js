import axios from "axios";
export const sendInvice = (p_id, city, country, address, zip, state) => {
  return async function () {
    try {
      const request = await axios({
        method: "POST",
        url: "https://rn-shopping.herokuapp.com/addinvoice/ship",
        data: {
          p_id,
          city,
          address,
          zip,
          country,
          state,
        },
        headers: { "Content-Type": "application/json" },
      });
      if (request.status === 200) {
        console.log("Yes");
      }
    } catch (err) {
      return err;
    }
  };
};
