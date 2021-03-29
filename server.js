const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const shortId = require("shortid");

const app = express();

app.use(bodyParser.json());

app.use("/", express.static(__dirname + "/build"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

mongoose.connect("mongodb://localhost/ecart", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortId.generate },
    image: String,
    title: String,
    description: String,
    availableSizes: [String],
    price: Number,
  })
);

app.get("/api/v1/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/v1/products", async (req, res) => {
  const newProducts = new Product(req.body);
  const savedProducts = newProducts.save();
  res.send(savedProducts);
});

app.delete("/api/v1/products/:id", async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deleteProduct);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server running at http://localhost:5000");
});
