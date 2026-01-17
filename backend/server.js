const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage (Phase 1)
let stocks = [];

/**
 * SELLER POSTS STOCK
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

    res.json({
        message: "Stock added successfully",
        stock
    });
 Rockstar
});

/**
 * BUYER FETCHES STOCKS (WITH FILTERING)
 */
app.get("/stocks", (req, res) => {
    const { product, variety, city } = req.query;

    let filteredStocks = stocks;

    if (product) {
        filteredStocks = filteredStocks.filter(
            s => s.product === product
        );
    }

    if (variety) {
        filteredStocks = filteredStocks.filter(
            s => s.variety === variety
        );
    }

    if (city && city !== "All") {
        filteredStocks = filteredStocks.filter(
            s => s.city === city
        );
    }

    res.json(filteredStocks);
});

// IMPORTANT: Render dynamic port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
