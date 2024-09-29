const UserModel = require("./../Models/Users");

exports.signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    if (!email) {
      return res.status(200).json({ err: "Email Missing" });
    }
    if (!username) {
      return res.status(200).json({ err: "UserName Missing" });
    }
    if (!password) {
      return res.status(200).json({ err: "Password Missing" });
    }
    let quary = {
      email: email,
    };
    const existmail = await UserModel.find(quary);
    if (existmail.length == 0) {
      const newUser = new UserModel({ email, username });
      const registerUser = await UserModel.register(newUser, password);
      req.login(registerUser, (err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({ registerUser });
      });
    } else {
      return res.status(404).json({ err: "Gmail allready Register" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.login = async (req, res) => {
  res.status(200).json({ data: "Login Successful" });
};

exports.logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ data: "Logout Sucessful" });
  });
};
