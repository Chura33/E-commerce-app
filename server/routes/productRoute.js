const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authorization")
const { check, validationResult } = require("express-validator");
const Product = require("../models/product");

router.post(
    "/",
    [
        auth,
        [ 
            check("name", "Name is required").not().isEmpty(),
            check("price", "Price is required").not().isEmpty(),
            check("category", "Category is required").not().isEmpty(),
            check("description", "Description is required").not().isEmpty(),
            check("quantity", "Quantity is required").not().isEmpty(),
        ],
    ],
    async(req, res) => {
        const error =validationResult(req);
        if(!error.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            console.log(req.body);
            console.log(req.user);
            const { name, category, price, description, brand, quantity } = req.body;
            const newProdcut = new Product({
            userId: req.user.id,
            name,
            category,
            price,
            description,
            quantity,
            brand,
        });
        const product = await newProdcut.save();
        res.json({msg: 'Product created'})
        } catch (error) {
            console.error(error.message);
            res.send(500).send("Server error");
        }
    }
);
// get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.send(500).send("Server error");
    }
});

// get specific product
router.get("/:id", async (req, res) => {
    try {
        const products = await Product.findById(req.params.id);
        if(!product){
            return res.status(400).json({msg: "Products was not found" });
        }

        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.send(500).send("Server error");
    }
});

module.exports = router