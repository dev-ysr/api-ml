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
            console.log(body);
            processResponse(req, res, body);
        } else {
            console.log(response.statusCode);
        }
    });

});

const processResponse = (req, res, responseBody) => {
    // console.log(responseBody);
    let data = JSON.parse(responseBody);
    console.log(data);
    res.json({ 'data': data });
}

module.exports = router;