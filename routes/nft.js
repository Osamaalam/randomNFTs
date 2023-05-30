const express = require("express");
const router = express.Router();

const { generateRandomNFTs } = require("../controllers/nftController");

router.route("/generateNFTs").get(generateRandomNFTs);

module.exports = router;
