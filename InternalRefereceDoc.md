
# Handling the Browser keyring.
```
//Before creating the keyring you have to wait till cryptoWaitReady is initalized
const { cryptoWaitReady } = await import("@polkadot/util-crypto");
await cryptoWaitReady();

//adding a dummy account
const mnemonic = mnemonicGenerate();
keyring.addUri(mnemonic, "password", { name: "first pair" }, "ed25519")

// Loading all the accounts present in the browser local storage.
keyring.loadAll({ ss58Format: 2, type: 'ed25519' });


//get all the accounts in currently stored in the browser as an array
const accounts = keyring.getAccounts();

//get a specific keyring for correspoing to an account
const address= accounts[0].address
const pair = keyring.getPair(address)

//check to see if the keyring is locked before signing a message
console.log(pair.address, pair.isLocked);

//before signiging you have to unlock the keyring.
pair.unlock('password')
pair.sign("some message")
```