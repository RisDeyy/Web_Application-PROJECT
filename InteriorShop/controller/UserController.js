const jwt = require("jsonwebtoken");
const passport = require("../middlewares/partport");
const utils = require("../utils/mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const SendmailController = require("../controller/SendmailController");
const Session = require("../models/Session");
const ShoppingCart = require("../models/ShoppingCart");

module.exports = {
  getLogin: (req, res, next) => {
    if (req.user) {
      res.redirect("/home");
      return;
    }
    res.render("login/login", {
      layout: false,
      wrongLogin: req.query.wrongLogin,
    });
  },
  getLogout: async(req, res, next) => {
    req.logout();
    res.redirect("/home");
    const session = await Session.findOne({ idUser: req.session.unauthId });
    if (session == null) {
      const shoppingCart = await new ShoppingCart({
        listProductOrder: [],
        status: false,
        purchasedTime: new Date().toLocaleString(),
      });
      shoppingCart.save(async (err, data) => {
        if (err) {
          console.log(err);
          res.render("errors/500", { error: err });
        } else {
          const newSession = await new Session({
            idUser: req.session.unauthId,
            idShoppingCart: data._id,
          });
          newSession.save((err) => {
            if (err) {
              console.log(err);
              res.render("errors/500", { error: err });
            }
          });
        }
      });
    }
  },

  getRegister: (req, res, next) => {
    if (req.user) {
      return res.redirect("/home");
    }
    res.render("register/register", { layout: false });
  },

  getActivateAccount: async (req, res, next) => {
    const { token } = req.params;

    if (token) {
      jwt.verify(
        token,
        process.env.JWT_ACC_ACTIVATE,
        function (err, decodedToken) {
          if (err) {
            return res.status(400).json({ error: "Incorrect or expired link" });
          }
          const { id, name, email, password, status } = decodedToken;

          User.findByIdAndUpdate(id, { status: true }, (error) => {
            if (error) {
              console.log(error);
            } else {
              console.log("email verification successful");
            }
          });
        }
      );

      res.json({ mesage: "Sign up success!" });
    } else {
      return res.json({ error: "Something went wrong!" });
    }
  },

  postActivateAccount: async (req, res, next) => {
    const { token } = req.params;
    //const {token} = req.body;
    if (token) {
      jwt.verify(
        token,
        process.env.JWT_ACC_ACTIVATE,
        function (err, decodedToken) {
          if (err) {
            return res.status(400).json({ error: "Incorrect or expired link" });
          }

          const { id, name, email, password, status } = decodedToken;

          User.findByIdAndUpdate(id, { status: true }, (error) => {
            if (error) {
              console.log(error);
            } else {
              console.log("email verification successful");
            }
          });
        }
      );

      res.json({ mesage: "Sign up success!" });
    } else {
      return res.json({ error: "Something went wrong!" });
    }
  },


  postRegister: async (req, res, next) => {
    if (req.body.password !== req.body.re_password) {
      return res.render("register/register", {
        layout: false,
        error: "Mật khẩu không khớp",
      });
    }
    const user = await User.findOne({ email: req.body.email }).lean();
    if (user) {
      return res.render("register/register", {
        layout: false,
        error: "Email đã tồn tại",
      });
    }
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      address: req.body.address,
      status: false,
    });

    newUser.save((err) => {
      if (err) return next(err);const id = newUser._id;
      const status = newUser.status;
      const token = jwt.sign(
        { id, name, email, password, status },
        process.env.JWT_ACC_ACTIVATE,
        { expiresIn: "15m" }
      );

      const result = SendmailController.sendMail(
        req.body.email,
        "ĐĂNG KÝ TÀI KHOẢN THÀNH CÔNG! XÁC NHẬN EMAIL ĐĂNG KÝ",
        "Chúc mừng bạn đã đăng ký thành công trên Changcannang! Bạn vui lòng xác nhận email đăng ký bằng cách nhấn vào đường link sau:" +
          "<br>" +
          "<p>" +
          `${req.protocol}://${req.get("host")}/email-activate/${token}` +
          "<p>" +
          "<br>" +
          `Email: ${req.body.email}` +
          "<br>" +
          `Mật khẩu: ${req.body.password}`
      );   

      res.render("login/login", {
        layout: false,
        message:
          "Đăng ký tài khoản thành công, check mail để xem thông tin tài khoản và xác nhận tài khoản.",
      });   
    });
  },
  
  async getMyAccount(req, res, next) {
    if (req.user == null) {
      res.redirect("/login");
      return;
    }
    const user = await User.findOne({ email: req.user.email });
    res.render("my-account/my-account", {
      layout: false,
      user: utils.mongooseToObject(user),
    });
  },
  async getMyAccountEdit(req, res, next) {
    if (req.user == null) {
      res.redirect("/login");
      return;
    }
    res.render("my-account/edit-account", {
      layout: false,
    });
  },
  async postMyAccountEdit(req, res, next) {
    const user = await User.findOne({ email: req.body.email }).lean();
    if (user && user.email !== req.user.email) {
      return res.render("my-account/edit-account", {
        layout: false,
        error: "Email đã tồn tại",
      });
    }
    if (!req.body.name) {
      return res.render("my-account/edit-account", {
        layout: false,
        error: "Tên không được để trống",
      });
    }
    if (!req.body.address) {
      return res.render("my-account/edit-account", {
        layout: false,
        error: "Địa chỉ không được để trống",
      });
    }
    await User.findByIdAndUpdate(req.user.id, {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
    })
      .then(() => {
        req.user.name = req.body.name;
        req.user.address = req.body.address;
        req.user.email = req.body.email;
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        res.render("errors/404");
      });
  },
  getChangePassword(req, res, next) {
    if (req.user == null) {
      res.redirect("/login");
      return;
    }
    res.render("my-account/change-password", { layout: false });
  },
  async postChangePassword(req, res, next) {
    if (req.user == null) {
      res.redirect("/login");
      return;
    }
    const password = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const reNewPassword = req.body.re_password;
    if (!password || !newPassword || !reNewPassword) {
      res.render("my-account/change-password", {
        layout: false,
        error: "Ô dữ liệu không được để trống!!",
      });
      return;
    }
    const user = await User.findById(req.user.id);
    if (!bcrypt.compareSync(password, user.password)) {
      res.render("my-account/change-password", {
        layout: false,
        error: "Mật khẩu không đúng!!",
      });
      return;
    }
    if (reNewPassword !== newPassword) {
      res.render("my-account/change-password", {
        layout: false,
        error: "Nhập lại mật khẩu sai !!",
      });
      return;
    }
    const hash = bcrypt.hashSync(req.body.newPassword, 10);
    User.findByIdAndUpdate(req.user.id, { password: hash })
      .then(() => {
        res.redirect("/home");
      })
      .catch((err) => {
        console.log(err);
        res.render("errors/404");
      });
  },
};