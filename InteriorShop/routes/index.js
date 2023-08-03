const productRouter = require("./product");
const homeRouter = require("./home");
const userRouter = require("./user");

function route(app) {
    app.use("/home", homeRouter);
    app.get("/", function (req, res) {
        res.redirect("/home");
    });

    app.use("/shop-grid", productRouter);

    app.use("/", userRouter);

    app.get("/shop-details", function (req, res) {
        res.render("shop-details/shop-details");
    });
    app.get("/shoping-cart", function (req, res) {
        res.render("shoping-cart/shoping-cart");
    });
    
    app.get("/contact", function (req, res) {
        res.render("contact/contact");
    });
}

module.exports = route;