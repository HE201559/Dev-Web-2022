const express = require("express");
const { append } = require("express/lib/response");
const router = express.Router();
const {con} = require("../model/postModel");

router.get('/', (req, res) => {
    res.send(con.stringify);

} )

module.exports = router;