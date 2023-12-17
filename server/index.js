const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// Can Hardcode the Merkle Tree root here
// I have borrowed it from front end.
const MERKLE_ROOT = "";

app.post("/gift", (req, res) => {
  let isInTheList = false;

  // grab the parameters from the front-end here
  const { name, proof, root } = req.body;

  // verify if the name is on the list
  isInTheList = verifyProof(proof, name, root);
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
