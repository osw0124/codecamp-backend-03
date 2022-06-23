import express from "express";

const app = express();

// 주식가격 조회
app.get("/stocks", (req, res) => {
    res.status(200).send("fetchStocks!!!");
});

app.get("/stocks/max", (req, res) => {
    res.status(200).send("getMaxStock!!");
});

app.post("/stocks", (req, res) => {
    res.status(201).send("createStocks!!!");
});

app.listen(3002, () => {
    "Port 3002: stock server On!!";
});
