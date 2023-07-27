module.exports = {
  registerValidator: (req, res, next) => {
    const { email, password, fullname, photo } = req.body;
    if (email === undefined || email === "") {
      throw new Error("Field Cannot Be Empty!");
    } else if (password === undefined || password === "") {
      throw new Error("Field Cannot Be Empty!");
    } else if (fullname === undefined || fullname === "") {
      throw new Error("Field Cannot Be Empty!");
    }
    next();
  },
  loginValidator: (req, res, next) => {
    const { email, password } = req.body;
    if (email === undefined || email === "") {
      throw new Error("Field Cannot Be Empty!");
    } else if (password === undefined || password === "") {
      throw new Error("Field Cannot Be Empty!");
    }
    next();
  },
};
