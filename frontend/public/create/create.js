let web3;
let lastSent;
let isPending = false;
let isDownloaded = false
let min = 0
let max = 1000000000000
let lockTime = 604800 //7 days
let decimals = 0;

function uuidv4(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuidv4)}

let chains = {
  "bsc": "BSC",
  "polygon": "Polygon",
  "avax": "Avalanche"
}

let chainIdentificator = {
  "eth": "1",     //Mainnet
  "polygon": "2",   //Polygon
  "avax": "3", //Avalanche
  "bsc": "4",   //BSC
}

let chainToId = {
  "eth": "0x1",     //Mainnet
  "polygon": "0x89",   //Polygon
  "avax": "0xa86a", //Avalanche
  "bsc": "0x38",   //BSC
}

async function getContract(){
  let contracts = {
    "0x1": "",     //Mainnet
    "0x89": "0xB4fcA931C5337B5ce924C6Ac87BD82b604dcdB51",   //Polygon
    "0xa86a": "0xB4fcA931C5337B5ce924C6Ac87BD82b604dcdB51", //Avalanche
    "0x38": "0xB4fcA931C5337B5ce924C6Ac87BD82b604dcdB51",   //BSC
  }
  let chain = await getParameterByName("chain")
  let chainId = window.ethereum.providerChainId ? window.ethereum.providerChainId : window.ethereum.chainId
  let targetChainId = chainToId[chain]

  if (!chainId){
    chainId = chainToId[chain]
  }

  if (chainId.toLowerCase() != targetChainId){
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: targetChainId }]
    });
  }

  return contracts[targetChainId.toLowerCase()]
}

async function init(){
  let chain = getParameterByName("chain")

  let id = chainIdentificator[chain] + (Math.floor(Math.random() * (max - min + 1)) + min);
  let secret = "secret_"+uuidv4();
  let hash = (new Web3()).utils.soliditySha3(secret)

  document.getElementById("id").value = id;
  document.getElementById("secret").value = secret;
  document.getElementById("unlockHash").value = hash;

  document.getElementById("604800").classList.add("buttonTime-selected");
  document.getElementById("chain-title").innerText = chains[chain] ? chains[chain] : "BSC"
}

async function main(creator, tokenContract, amount){
  let isApproved = await checkApprovals()

  if (!isApproved){
    return
  }

  let details = {
    creator: document.getElementById("creator").value,
    receiver: document.getElementById("receiver").value,
    token: document.getElementById("token").value,
    amount: document.getElementById("amount").value,
    id: document.getElementById("id").value,
    secret: document.getElementById("secret").value,
    hash: document.getElementById("unlockHash").value,
    lockTime: lockTime
  }

  if (!(new Web3()).utils.isAddress(details.creator)) {
    document.getElementById("creator").focus()
    return;
  }
  if (details.receiver.length == 0) {
    document.getElementById("receiver").focus()
    return;
  }
  if (!(new Web3()).utils.isAddress(details.token)) {
    document.getElementById("token").focus()
    return;
  }
  if (!details.amount) {
    document.getElementById("amount").focus()
    return;
  }

  details.amount = (details.amount * Math.pow(10, decimals)).toString()

  if (!isDownloaded){
    isDownloaded = true
    let backupFileContent = JSON.stringify(details, null, 4)
    download(backupFileContent, "backup_"+details.id+".txt", "txt")
  }

  let swapContract = new web3.eth.Contract(SwapABI, await getContract());
  let data = await swapContract.methods.createSwap(
    details.id,
    details.hash,
    details.receiver,
    details.token,
    details.amount,
    details.lockTime
  ).encodeABI()
  const transactionParameters = {
		to: await getContract(), // Required except during contract publications.
		from: details.creator, // must match user's active address.
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

function download(data, filename, type) {
  let file = new Blob([data], {type: type});
  if (window.navigator.msSaveOrOpenBlob) // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    var a = document.createElement("a"),
    url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

async function checkApprovals(){
  let account = await connectMetamask()
  web3 = new Web3(window.ethereum)
  let utils = web3.utils;

  let token = document.getElementById("token").value
  let amount = document.getElementById("amount").value
  let creator = document.getElementById("creator").value

  if (!creator) creator = account
  if (!token) return;

  let tokenContract = new web3.eth.Contract(ABI, token);
  let swapContractAddress = await getContract()
  let allowance = await tokenContract.methods.allowance(creator, swapContractAddress).call()
  decimals = await tokenContract.methods.decimals().call()

  if (!amount) return

  amount = amount * Math.pow(10, decimals)

  if (amount < 1){
    alert("Amount too small");
    return
  }


  if (utils.toBN(amount.toString()).gt(utils.toBN(allowance.toString()))){
    if (isPending != true) {
      document.getElementById("action-button").innerText = "Approve"
      document.getElementById("action-button").onclick = function() { approve(creator, tokenContract, amount.toString()) };
    }
    return false;
  } else {
    isPending = false;
    document.getElementById("action-button").innerText = "Create"
    document.getElementById("action-button").onclick =  function() { main(creator, tokenContract, amount.toString()) };
    return true;
  }
}

async function approve(user, tokenContract, amount){
  if (new Date().getTime() - lastSent < 2000) return; //avoid multiple tx sent to wallet bug

  lastSent = new Date().getTime()
  let data = await tokenContract.methods.approve(await getContract(), amount).encodeABI()
  const transactionParameters = {
		to: tokenContract._address, // Required except during contract publications.
		from: user, // must match user's active address.
		data: data, // Optional, but used for defining smart contract creation and interaction.
	};

	const txHash = await ethereum.request({
		method: 'eth_sendTransaction',
		params: [transactionParameters],
	});
  isPending = true;
  document.getElementById("action-button").innerHTML = `<i class="fa fa-refresh fa-spin"></i> Approving`
	console.log(txHash)

  let interval = setInterval(async () => {
    let txReceipt = await web3.eth.getTransactionReceipt(txHash)
    if (txReceipt && txReceipt.blockNumber){
      clearInterval(interval)
      isPending = false;
      document.getElementById("action-button").innerText = "Create"
      document.getElementById("action-button").onclick =  function() { main(creator, tokenContract, amount.toString()) };
    }
  }, 5000)
}

async function connectMetamask(){
	if (typeof window.ethereum !== 'undefined') {
		let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
		return accounts[0];
	} else {
		alert("MetaMask is not installed!")
	}
}

async function lockupTimeButton(x){
  lockTime = x.id
  document.getElementById("259200").classList.remove("buttonTime-selected");
  document.getElementById("432000").classList.remove("buttonTime-selected");
  document.getElementById("604800").classList.remove("buttonTime-selected");

  x.classList.add("buttonTime-selected");
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
