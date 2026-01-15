const express = require("express");
const cors = require("cors");

const app = express();

// ✅ ENABLE CORS
app.use(cors());
app.use(express.json());

// Temporary in-memory storage
let stocks = [];

/**
 * Seller posts stock
 */
app.post("/stocks", (req, res) => {
    const stock = {
        id: Date.now(),
        product: req.body.product,
        variety: req.body.variety,
        quantity: req.body.quantity,
        unit: req.body.unit,
        price: req.body.price,
        city: req.body.city,
        description: req.body.description
    };

    stocks.push(stock);
    res.json({ message: "Stock added successfully", stock });
});

/**
 * Buyer fetches stocks
 */
app.get("/stocks", (req, res) => {
    res.json(stocks);
});

// IMPORTANT: Use Render provided PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
