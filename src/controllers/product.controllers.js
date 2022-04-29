const express = require("express");
const router = express.Router();
const Product = require("../models/product.models");
const authenticate = require("../middelwares/authenticate");
const authorise = require("../middelwares/authorise");
router.post("", authenticate, async (req, res) => {
    try {
        req.body.user_id = req.user._id;
        const product = await Product.create(req.body);
        return res.status(200).send(product);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

router.patch("/:id", authenticate, authorise(["admin", "seller"]), async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send(product);
    }
    catch (err) {
        return res.status(400).send({ message: err.message });
    }
});

router.get("", async (req, res) => {
    try {
        const products = await Product.find().lean().exec();
        return res.status(200).send(products);
    }
    catch (error) {
        return res.status(400).send({ message: error.message });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const products = await Product.findById(req.params.id).lean().exec();
        return res.status(200).send(products);
    }
    catch (error) {
        return res.status(400).send({ message: error.message });
    }
});
module.exports = router;