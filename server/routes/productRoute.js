const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authorization");
const {body, validationResult} = require("express-validator")
const Product = require("../models/product");
router.post ('/',
[
auth,
    [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('description').not().isEmpty().withMessage('description is required'),
        body('category').not().isEmpty().withMessage('category is required'),
        body('price').not().isEmpty().withMessage('price is required'),
        body('quantity').not().isEmpty().withMessage('quantity is required'),
    ]
    
], async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
    const {name, description, category, price, brand, quantity,} = req.body;
    const newProduct = new Product ({
        userId: req.user.id,
        name,
        description,
        category,
        price,
        brand,
        quantity 
    })

    const product = await newProduct.save();
    return res.status(201).json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error")
    }
})

// get all products

router.get('/', async(req,res)=>{
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error")
    }
})

// get a specific product

router.get('/:id', async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);

        if (!product){
            return res.status(400).json({msg: "Product was not found"})
        }

        return res.status(200).json(product)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("server error")
    }
})

module.exports = router;