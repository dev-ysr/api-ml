const { Router } = require("express");
const request = require("request");
const router = Router();
const { writeFile, readFile } = require("fs");
let productsCache = require("../utils/storage.json");
const { log } = require("console");
const path = require("path");

router.get("/api/search", (req, res) => {
    const query = req.query.query;

    if (!query) {
        return;
    }

    if (!existsQuery(query)) {

        const requestOptions = {
            url: "https://api.mercadolibre.com/sites/MLA/search?q=" + query,
            method: "GET",
        };

        request(requestOptions, (err, response, body) => {
            if (err) {
                console.log(err);
            } else if (response.statusCode === 200) {
                processResponse(req, res, body, query);
            } else {
                console.log(response.statusCode);
            }
        });

    } else {
        res.json(productsCache[query]);
    }


});

const processResponse = (req, res, responseBody, query) => {
    let data = JSON.parse(responseBody).results;

    let products = [];

    data.forEach((item) => {
        product = {
            id: item.id,
            title: item.title,
            price: item.price,
            currency_id: item.currency_id,
            available: item.available,
            thumbnail: item.thumbnail,
            condition: item.condition,
        };
        products.push(product);
    });

    addToCache(query, products);
    res.json(products);
};

const addToCache = (query, items) => {
    productsCache[query] = items;

    const file = path.join(__dirname, "./../utils/storage.json");

    writeFile(file, JSON.stringify(productsCache), () => {
        console.log("write");
    });
};

const existsQuery = (query) => {
    if (productsCache[query]) {
        return true;
    } else {
        return false;
    }
};

module.exports = router;