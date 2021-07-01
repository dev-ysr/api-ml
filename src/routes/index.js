const { Router } = require("express");
const request = require("request");
const router = Router();

router.get("/api/search", (req, res) => {
    const query = req.query.query;

    if (!query) {
        return;
    }

    console.log(query);

    const requestOptions = {
        url: "https://api.mercadolibre.com/sites/MLA/search?q=" + query,
        method: "GET",
    };

    request(requestOptions, (err, response, body) => {
        if (err) {
            console.log(err);
        } else if (response.statusCode === 200) {
            processResponse(req, res, body);
        } else {
            console.log(response.statusCode);
        }
    });

});

const processResponse = (req, res, responseBody) => {
    let data = JSON.parse(responseBody).results;

    let products = [];

    data.forEach(item => {
        product = {
            id: item.id,
            title: item.title,
            price: item.price,
            currency_id: item.currency_id,
            available: item.available,
            thumbnail: item.thumbnail,
            condition: item.condition
        }
        products.push(product);
    });

    res.json(products);
}

const addToCache = (req, res, responseBody) => {

}

module.exports = router;