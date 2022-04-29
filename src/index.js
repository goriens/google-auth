const express = require("express");
const connect = require("./configs/db");
const userController = require("./controllers/users.controllers");
const { register, login, newToken } = require("./controllers/auth.controller");
const productController = require("./controllers/product.controllers");
const passport = require("./configs/google-oauth");
const app = express();
app.use(express.json());

app.use("/users", userController);
app.post("/register", register);
app.post("/login", login);
app.use("/products", productController);

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    function (req, res) {
        const token = newToken(req.user);
        return res.status(200).send({ user: req.user, token });
    });

app.listen(5000, async () => {
    try {
        await connect();
        console.log("Listening on port 5000");
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = passport;