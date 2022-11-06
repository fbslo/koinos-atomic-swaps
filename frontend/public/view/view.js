let web3;
let koinosLockTime;
let koinosTxCreated = false;

let swapContract;
let swapContractEvm;
let chain;

let signer;
let provider;

let isEvmCompleted = false;
let isKoinosCompleted = false;

let chainNodes = {
  "bsc": "https://bsc-dataseed1.binance.org/",
  "polygon": "https://polygon-rpc.com/",
  "avax": "https://api.avax.network/ext/bc/C/rpc"
}

let chainIdentificator = {
  "1": "eth",
  "2": "polygon",
  "3": "avax",
  "4": "bsc"
}

let chainNames = {
  "bsc": "BSC",
  "polygon": "Polygon",
  "avax": "Avalance"
}


async function getContract(id){
  let contracts = {
    "eth": "",     //Mainnet
    "polygon": "0xB4fcA931C5337B5ce924C6Ac87BD82b604dcdB51",   //Polygon
    "avax": "0xB4fcA931C5337B5ce924C6Ac87BD82b604dcdB51", //Avalanche
    "bsc": "0xB4fcA931C5337B5ce924C6Ac87BD82b604dcdB51",   //BSC
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
  chain = chainIdentificator[orderId.slice(0, 1)]
  web3 = new Web3(chainNodes[chain])

  document.getElementById("counterpartyChain").innerText = chainNames[chain]
  document.getElementById("id").value = orderId

  provider = new Provider([
    "https://api.koinos.io",
    window.location.origin+"/jsonrpc",
    "https://api.koinosblocks.com"
  ]);
  if (kondor.provider) {
    // provider = kondor.provider
    signer = await kondor.getSigner()
  } else {
    signer = Signer.fromWif("5HueCGU8rMjxEXxiPuD5BDku4MkFqeZyd4dZ1jvhTVqvbTLvyTJ"); //random private key
    signer.provider = provider;
  }

  swapContract = new Contract({
    id: "1AtomicxFzn5XbFpSbsW2D1xj4Vo291vE2",
    abi: KoinosSwapContractABI,
    provider: provider,
    signer: signer
  });

  getEvmSwap(orderId, chain, swapContract)

  const { result } = await swapContract.functions.getSwap({
    id: orderId
  });

  if (result){
    let tokenContract = new Contract({
      id: result.token,
      abi: utils.tokenAbi,
      provider,
      signer,
    });

    const resultDecimals = await tokenContract.functions.decimals();
    let decimals = resultDecimals.result.value

    koinosTxCreated = true
    document.getElementById("creator").value = result.creator
    document.getElementById("receiver").value = result.receiver
    document.getElementById("token").value = result.token
    document.getElementById("amount").value = Number(result.amount) / Math.pow(10, decimals) + ` (${result.amount})`
    document.getElementById("expiration").innerHTML = `<input type="text" readonly="readonly" id="koinos_expiration" name="Expiration" placeholder="Expiration"><p>`
    let exp = Number(result.expiration) //without Number(), it will throw Invalid Date error
    document.getElementById("koinos_expiration").value = new Date(exp).toString().split("(")[0] + ` (${await countdown(exp)})`

    if (result.finalized){
      isKoinosCompleted = true;
    }

    // both trades were initialized, now the secret can be released
    if (result.secret && result.secret.length > 0){
      document.getElementById("koinos-checkmark").innerHTML = `<i class="fa fa-check fa-1x" aria-hidden="true"></i>`
      release(orderId, "evm", result.secret)
    } else {
      release(orderId, "koinos", result.secret)
    }
  }
}

async function create(){
  let hash = document.getElementById("unlockHash").value.trim()

  if (hash.startsWith("0x")){
    hash = hash.substring(2)
  }

  let details = {
    creator: document.getElementById("creator").value.trim(),
    receiver: document.getElementById("receiver").value.trim(),
    token: document.getElementById("token").value.trim(),
    amount: document.getElementById("amount").value.trim(),
    id: document.getElementById("id").value.trim(),
    hash: hash,
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

  let tokenContract = new Contract({
    id: details.token,
    abi: utils.tokenAbi,
    provider,
    signer,
  });

  let resultDecimals = await tokenContract.functions.decimals();
  let decimals = resultDecimals.result.value

  details.amount = (Number(details.amount) * Math.pow(10, decimals)).toString()

  let payer = (await kondor.getAccounts())[0].address

  const result = await swapContract.functions.createSwap({
    unlockHash: details.hash,
    creator: details.creator,
    receiver: details.receiver,
    token: details.token,
    amount: details.amount,
    id: details.id,
    lockTime: details.lockTime,
  }, {
    rcLimit: 100000000,
    payer: payer,
    chainId: "EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA=="
  });

  Swal.fire(
    'Congratulations!',
    'Transaction was sent: ' + result.receipt.id,
    'success'
  )

  console.log(result)
}

async function getEvmSwap(orderId, chain, koinosSwapContract){
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

  if (orderInfo.finalized){
    isEvmCompleted = true;
    checkIfCompleted(koinosSwapContract, orderId)
  }

  return true;
}

async function checkIfCompleted(koinosSwapContract, orderId){
  const { result } = await swapContract.functions.getSwap({
    id: orderId
  });

  if (result.finalized){
    isKoinosCompleted = true
    document.getElementById("mainButton").innerText = 'Completed'
    document.getElementById("mainButton").classList.add("complete-button");
    document.getElementById("mainButton").onclick = false;

    document.getElementById("secret").value = result.secret
    document.getElementById("secret").readOnly = true

    document.getElementById("koinos-checkmark").innerHTML = `<i class="fa fa-check fa-1x" aria-hidden="true"></i>`
    document.getElementById("evm-checkmark").innerHTML = `<i class="fa fa-check fa-1x" aria-hidden="true"></i>`

    fireworks()
    return true;
  }

  return false;
}

async function release(id, side, secret){
  if (isKoinosCompleted && isEvmCompleted){
    checkIfCompleted(koinosSwapContract, id)
    return false
  }

  document.getElementById("secret").value = ""
  document.getElementById("secret").readOnly = false
  document.getElementById("mainButton").innerText = "Release"

  document.getElementById("mainButton").onclick = function(){
    if (side == "koinos") releaseKoinos(id)
    if (side == "evm") releaseEvm(id, secret)
  }
}

async function releaseKoinos(id){
  let secret = document.getElementById("secret").value

  if (!secret){
    document.getElementById("secret").focus()
    return
  }

  let payer = (await kondor.getAccounts())[0].address

  const result = await swapContract.functions.completeSwap({
    id: id,
    secret: secret
  }, {
    rcLimit: 100000000,
    payer: payer,
    chainId: "EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA=="
  });

  Swal.fire(
    'Congratulations!',
    'Transaction was sent: ' + result.receipt.id,
    'success'
  )

  console.log(result)
}

async function releaseEvm(id, secret){
  let data = await swapContractEvm.methods.completeSwap(id, secret).encodeABI()

  let toContract = await getContract(chain)

  console.log(toContract, chainIdentificator[chain], chain)

  const transactionParameters = {
		to: toContract, // Required except during contract publications.
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

async function fireworks(){
  let duration = 5 * 1000;
  let animationEnd = Date.now() + duration;
  let defaults = { startVelocity: 20, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function() {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.5, 0.9), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.3, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}
