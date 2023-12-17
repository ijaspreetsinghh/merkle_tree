const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

// Creating our Merkle Tree
let Mtree = new MerkleTree(niceList);
const root = Mtree.getRoot();

// Creating an Identity to check presence in the gift List
let name = "Dr. Olga Kassulke";
const index = niceList.findIndex((n) => n === name);
const proof = Mtree.getProof(index);

async function main() {
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // Sending minimal information to server to verify Proof
    name: name,
    proof: proof,
    root: root,
  });

  console.log({ gift });
}

main();
