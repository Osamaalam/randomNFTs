/** @format */

const express = require("express");
const generateNFTs = require("./routes/nft");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use("/api/v1", generateNFTs);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
