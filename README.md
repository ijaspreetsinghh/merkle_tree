# Gift List

To get started with the repository, clone it and then run `npm install` in the top-level directory to install the depedencies.

There are three folders in this repository:

## Server

You can run the server from the top-level directory with `node server/index`. This file is an express server which will be hosted on port 1225 and respond to the client's request.

Think of the server as the _verifier_ here. It needs to verify that the `name` passed by the client is in the `MERKLE_ROOT`. If it is, then we can send the gift! 

## Client

You can run the client from the top-level directory with `node client/index`. This file is a script which will send an HTTP request to the server.

Think of the client as the _prover_ here. It needs to prove to the server that some `name` is in the `MERKLE_ROOT` on the server. 



## Utils

There are a few files in utils:

- The `niceList.json` which contains all the names of the people who deserve a gift this year (this is randomly generated, feel free to add yourself and others to this list!)
- The `example.js` script shows how we can generate a root, generate a proof and verify that some value is in the root using the proof. Try it out from the top-level folder with `node/example.js`
- The `MerkleTree.js` should look familiar from the Merkle Tree module! This one has been modified so you should not have to deal with any crypto type conversion. You can import this in your client/server
- The `verifyProof.js` should also look familiar. This was the last stage in the module. You can use this function to prove a name is in the merkle root, as show in the example.

# What is a Merkle Tree
Merkle trees are a fundamental component of blockchain technology, enabling efficient and secure verification of data integrity. Implementing a Merkle tree in JavaScript involves several steps. Below is a simple example implementation along with an explanation of each step.
```
const crypto = require('crypto');

// Step 1: Define a function to hash data
function sha256(data) {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}

// Step 2: Define a function to create a Merkle tree from an array of data
function createMerkleTree(data) {
  if (data.length === 0) {
    throw new Error('Cannot create Merkle tree with empty data');
  }

  // Step 3: If the number of elements is odd, duplicate the last element
  if (data.length % 2 !== 0) {
    data.push(data[data.length - 1]);
  }

  // Step 4: Create an array to store the intermediate nodes
  const merkleTree = [];

  // Step 5: Generate leaf nodes by hashing each data element
  const leafNodes = data.map(leaf => sha256(leaf));

  // Step 6: Recursive construction of the Merkle tree
  function buildTree(nodes) {
    if (nodes.length === 1) {
      return nodes[0];
    }

    const nextLevel = [];
    for (let i = 0; i < nodes.length; i += 2) {
      const combinedHash = sha256(nodes[i] + nodes[i + 1]);
      nextLevel.push(combinedHash);
    }

    return buildTree(nextLevel);
  }

  // Step 7: Build the Merkle tree starting from the leaf nodes
  const rootHash = buildTree(leafNodes);
  merkleTree.push(...leafNodes, rootHash);

  // Step 8: Return the Merkle tree
  return merkleTree;
}

// Step 9: Example usage
const data = ['a', 'b', 'c', 'd'];
const merkleTree = createMerkleTree(data);

console.log('Merkle Tree:', merkleTree);
```
**1. Hash Function (sha256)**: Define a hash function (e.g., SHA-256) to hash the data. This function is used to create the hash values for the leaf nodes and to combine hashes during the tree construction.

**2. Create Merkle Tree Function:** Define a function (createMerkleTree) that takes an array of data as input and constructs a Merkle tree.

**3. Check for Empty Data:** Ensure that the input data is not empty.

**4. Handle Odd Number of Elements:** If the number of elements in the data is odd, duplicate the last element to make it even. This ensures the construction of a complete binary tree.

**5. Initialize Intermediate Nodes Array:** Create an array (merkleTree) to store intermediate nodes during the tree construction.

**6. Generate Leaf Nodes:** Create leaf nodes by hashing each element of the input data.

**7. Recursive Tree Construction:** Implement a recursive function (buildTree) to construct the Merkle tree. Combine adjacent nodes' hashes until only the root hash remains.

**8. Build the Merkle Tree:** Invoke the recursive function to build the Merkle tree starting from the leaf nodes.

**Example Usage:** Provide an example of using the Merkle tree creation function with a sample set of data.

**Note:** This is a simplified example for educational purposes. Real-world implementations may include additional optimizations and considerations for handling large datasets. Additionally, in a blockchain context, Merkle trees are commonly used in combination with transactions to efficiently verify the integrity of a block.






