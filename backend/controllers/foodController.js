import foodModel from "../models/foodModel.js";
import fs from 'fs'


// add food
const addFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const image = req.file.filename;

        const newFood = new foodModel({
            name: name.trim(),
            price: Number(price),
            category: category.trim(),
            description: description.trim(),
            image: image
        })

        await newFood.save()

        res.status(201).json({
            success: true,
            message: "Food item added successfully",
            foodModel: newFood
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
        console.log(err)
    }
}

// all food list
const listFood = async (req, res) => {
    try {
        const food = await foodModel.find();

        res.status(200).json({
            success: true,
            food
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching food",
            error: err.message
        });
    }
}

// remove food
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "food not found"
            })
        }

        const imagePath = `uploads/${food.image}`;
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.log("Error deleting file:", err.message);
            } else {
                console.log("File deleted successfully");
            }
        });

        await foodModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "food deleted seccessfully"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting food",
            error: error.message
        })
    }
}


export { addFood, listFood, removeFood }