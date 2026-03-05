import userModel from "../models/userModel.js";

/* ADD TO CART */
const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    await userModel.updateOne(
      { _id: req.user._id },
      { $inc: { [`cartData.${itemId}`]: 1 } }
    );

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to add item"
    });
  }
};


/* REMOVE FROM CART */
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    const user = await userModel.findById(req.user._id);

    if (!user.cartData[itemId]) {
      return res.status(400).json({
        success: false,
        message: "Item not in cart"
      });
    }

    if (user.cartData[itemId] <= 1) {
      await userModel.updateOne(
        { _id: req.user._id },
        { $unset: { [`cartData.${itemId}`]: "" } }
      );
    } else {
      await userModel.updateOne(
        { _id: req.user._id },
        { $inc: { [`cartData.${itemId}`]: -1 } }
      );
    }

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to remove item"
    });
  }
};


/* GET CART */
const getCart = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .select("cartData");

    res.json({
      success: true,
      cartData: user.cartData || {}
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch cart"
    });
  }
};

export { addToCart, removeFromCart, getCart };