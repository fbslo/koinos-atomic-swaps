let web3;
let koinosLockTime;
let koinosTxCreated = false;

let swapContract;
let swapContractEvm;

let chainNodes = {
  "bsc": "https://bsc-dataseed1.binance.org/",
  "polygon": "https://polygon-rpc.com/",
  "avax": "https://api.avax.network/ext/bc/C/rpc"
}

let chainIdentificator = {
  "10101": "eth",
  "13700": "polygon",
  "43114": "avax",
  "56056": "bsc"
}

let chainNames = {
  "bsc": "BSC",
  "polygon": "Polygon",
  "avax": "Avalance"
}


async function getContract(id){
  let contracts = {
    "eth": "",     //Mainnet
    "polygon": "0x7c0d63083fDf3AC554eD0B85f08C7Fcb4e1b8Bd1",   //Polygon
    "avax": "", //Avalanche
    "bsc": "",   //BSC
  }
  return contracts[id]
}

let lockTimes = {
  "259200": "172800", //3 days => 2 days
  "432000": "302400", //5 days => 3.5 days
  "604800": "432000" //7 days => 5 days
}

async function load(){
  let orderId = getParameterByName("id")
  let chain = chainIdentificator[orderId.slice(0, 5)]
  if (orderId == "5605648565580577177224") chain = "polygon" //for test order
  web3 = new Web3(chainNodes[chain])

  document.getElementById("counterpartyChain").innerText = chainNames[chain]
  document.getElementById("id").value = orderId

  // getEvmSwap(orderId, chain)

  let provider;
  let signer;
  if (kondor.provider) {
    provider = kondor.provider
    signer = await kondor.getSigner()
  } else {
    provider = new Provider([window.location.origin+"/jsonrpc"]);
    signer = Signer.fromWif("5HueCGU8rMjxEXxiPuD5BDku4MkFqeZyd4dZ1jvhTVqvbTLvyTJ");
    signer.provider = provider;
  }

  swapContract = new Contract({
    id: "1CompCapuSTiLo8gfpygN79M18kyKEaBwj",
    abi: KoinosSwapContractABI,
    provider: provider,
    signer: signer
  });

  const { result } = await swapContract.functions.getSwap({
    id: orderId
  });

  if (result){
    koinosTxCreated = true
    document.getElementById("creator").value = result.creator
    document.getElementById("receiver").value = result.receiver
    document.getElementById("token").value = result.token
    document.getElementById("amount").value = result.amount
    document.getElementById("expiration").innerHTML = `<input type="text" readonly="readonly" id="koinos_expiration" name="Expiration" placeholder="Expiration"><p>`
    let exp = Number(result.expiration) //without Number(), it will throw Invalid Date error
    document.getElementById("koinos_expiration").value = new Date(exp).toString().split("(")[0] + ` (${await countdown(exp)})`

    // both trades were initialized, now the secret can be released
    if (result.secret && result.secret.length > 0){
      document.getElementById("koinos-checkmark").innerHTML = `<i class="fa fa-check fa-1x" aria-hidden="true"></i>`
      release(orderId, "evm")
    } else {
      document.getElementById("evm-checkmark").innerHTML = `<i class="fa fa-check fa-1x" aria-hidden="true"></i>`
      release(orderId, "koinos", result.secret)
    }
  }
}

async function create(){
  let details = {
    creator: document.getElementById("creator").value,
    receiver: document.getElementById("receiver").value,
    token: document.getElementById("token").value,
    amount: document.getElementById("amount").value,
    id: document.getElementById("id").value,
    hash: document.getElementById("unlockHash").value,
    lockTime: Number(koinosLockTime) * 1000
  }

  if (details.creator.length == 0){
    document.getElementById("creator").focus()
    return;
  }

  if (details.receiver.length == 0){
    document.getElementById("receiver").focus()
    return;
  }

  if (details.amount.length == 0){
    document.getElementById("amount").focus()
    return;
  }

  const { result } = await swapContract.functions.createSwap({
    unlockHash: details.hash,
    creator: details.creator,
    receiver: details.receiver,
    token: details.token,
    amount: details.amount,
    id: details.id,
    lockTime: details.lockTime,
  }, {
    rcLimit: 100000
  });

  Swal.fire(
    'Congratulations!',
    'Transaction was sent: '+ txHash,
    'success'
  )

  console.log(result)
}

async function getEvmSwap(orderId, chain){
  let swapContractAddress = await getContract(chain)
  swapContractEvm = new web3.eth.Contract(SwapABI, swapContractAddress);
  let orderInfo = await swapContractEvm.methods.swaps(orderId).call()
  let decimals = await (new web3.eth.Contract(ABI, orderInfo.token)).methods.decimals().call()

  document.getElementById("evm_creator").value = orderInfo.creator
  document.getElementById("evm_receiver").value = orderInfo.receiver
  document.getElementById("evm_token").value = orderInfo.token
  document.getElementById("evm_amount").value = orderInfo.amount / Math.pow(10, decimals) + ` (${orderInfo.amount})`
  document.getElementById("evm_expiration").value = new Date(Number(orderInfo.expiration) * 1000).toString().split("(")[0] + ` (${await countdown(Number(orderInfo.expiration) * 1000)})`
  document.getElementById("unlockHash").value = orderInfo.unlockHash

  if (!koinosTxCreated){
    let orderLockTime = orderInfo.expiration - orderInfo.createdAt
    koinosLockTime = lockTimes[orderLockTime]
    document.getElementById("lockTime").innerText = parseFloat(koinosLockTime / 86000).toFixed(1) + " days"
  }

  return true;
}

async function release(id, side, secret){
  document.getElementById("secret").value = ""
  document.getElementById("secret").readOnly = false
  document.getElementById("mainButton").innerText = "Release"
  document.getElementById("mainButton").onClick = function(){
    if (side == "koinos") releaseKoinos(id)
    if (side == "evm") releaseEvm(id, secret)
  }
}

async function releaseKoinos(id){
  const { result } = await swapContract.functions.completeSwap({
    id: id,
    secret: document.getElementById("secret").value
  }, {
    rcLimit: 100000
  });

  Swal.fire(
    'Congratulations!',
    'Transaction was sent: '+ txHash,
    'success'
  )

  console.log(result)
}

async function releaseEvm(id, secret){
  let data = await swapContractEvm.methods.completeSwap(orderId, secret).encodeABI()

  const transactionParameters = {
		to: await getContract(), // Required except during contract publications.
		from: await connectMetamask(), // must match user's active address.
		data: data, // Optional, but used for defining smart contract creation and interaction.
	};

	const txHash = await ethereum.request({
		method: 'eth_sendTransaction',
		params: [transactionParameters],
	});
  Swal.fire(
    'Congratulations!',
    'Transaction was sent: '+ txHash,
    'success'
  )
}

async function countdown(timestamp){
  let now = new Date().getTime();
  let distance = timestamp - now;
  let days = Math.floor(distance / (1000*3600*24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return days + "d " + hours + "h "+ minutes + "m " + seconds + "s";
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

async function connectMetamask(){
	if (typeof window.ethereum !== 'undefined') {
		let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
		return accounts[0];
	} else {
		alert("MetaMask is not installed!")
	}
}
