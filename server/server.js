require("dotenv").config()

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const API_KEY = process.env.API_KEY;

async function fetchNews(url) {
    try {
        const response = await axios.get(url)
            if (response.data.totalResults > 0) {
                return {
                    status: 200,
                    success: true,
                    message: "Successfully Fetched News!",
                    data: response.data,
                };
            } else {
                return {
                    status: 200,
                    success: true,
                    message: "No More Results to Display!",
                };
            }
        
    } catch (err) {
        return {
            status: 500,
            success: false,
            message: "Failed to Fetch News!",
            err: err.message,
        }; 
    }
}


app.get("/all-news", async (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    let url = `https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    // fetchNews(url, res);
    const result = await fetchNews(url);
    res.status(result.status).json(result);
});

// app.options("/top-headlines", cors());

app.get("/top-headlines", async (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    let category = req.query.category || "business";
    let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    // fetchNews(url, res);
    const result = await fetchNews(url);
    res.status(result.status).json(result);
});

// app.options("/country/:iso", cors());

app.get("/country/:iso", async (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    let country = req.params.iso;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`;
    // fetchNews(url, res);
    const result = await fetchNews(url);
    res.status(result.status).json(result);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Listening on PORT: ${PORT}`);
});
