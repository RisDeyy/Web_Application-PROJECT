const User = require("../models/User");
const Session = require("../models/Session");
const ShoppingCart = require("../models/ShoppingCart");
const ProductOrder = require("../models/ProductOrder");

module.exports = async function (req, res, next) {
    if (req.user) {
        const session = await Session.findOne({ idUser: req.session.unauthId });
        let shoppingCart;
        if (session != null) {
            shoppingCart = await ShoppingCart.findById(session.idShoppingCart);
        }
        const user = await User.findOne({ email: req.user.email });

        if (!user.idShoppingCart & (session != null)) {
            await User.findOneAndUpdate(
                { email: req.user.email },
                {
                    idShoppingCart: shoppingCart._id,
                }
            );
            await Session.findByIdAndDelete(session._id);
        } else if (session != null) {
            try {
                const shoppingCartUser = await ShoppingCart.findById(
                    user.idShoppingCart
                );
                if (shoppingCartUser == null) {
                    await User.findOneAndUpdate(
                        { email: req.user.email },
                        {
                            idShoppingCart: shoppingCart._id,
                        }
                    );
                    await Session.findByIdAndDelete(session._id);
                    return;
                }
                
                await Session.findByIdAndDelete(session._id);
            } catch (err) {
                console.log(err);
            }
        }
    }
    next();
}