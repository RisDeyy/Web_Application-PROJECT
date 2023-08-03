const passport = require("../middlewares/partport");
const bcrypt = require("bcrypt");
const User = require("../models/User");
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
    getLogout: (req, res, next) => {
        req.logout();
        res.redirect("/home");
    },
    getRegister: (req, res, next) => {
        if (req.user) {
            return res.redirect("/home");
        }
        res.render("register/register", { layout: false });
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
        const hash = bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({
            email: req.body.email,
            password: hash,
            name: req.body.name,
            address: req.body.address,
            status: true,
        }); 
        newUser.save((err) => {
            if (err) return next(err);
            res.redirect("/login");
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
        });
    },
    async getMyAccountEdit(req, res, next) {
        if (req.user == null) {
            res.redirect("/login");
        return;
        }

        res.render("my-account/edit-account", {
            layout: false
        });
    },
};