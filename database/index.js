// utilities/index.js

export const handleErrors = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  };
};

export const buildClassificationList = async () => {
  // Replace with real DB call if needed
  return "<option value='1'>SUV</option><option value='2'>Sedan</option>";
};