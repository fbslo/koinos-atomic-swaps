let web3;
let koinosLockTime;

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


async function getContract(){
  let contracts = {
    "0x1": "",     //Mainnet
    "0x89": "0x7c0d63083fDf3AC554eD0B85f08C7Fcb4e1b8Bd1",   //Polygon
    "0xA86A": "", //Avalanche
    "0x38": "",   //BSC
  }
  return contracts[window.ethereum.providerChainId]
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

  if (window.ethereum.providerChainId == undefined){
    let interval = setInterval(async () => {
      if (window.ethereum.providerChainId != undefined) {
        clearInterval(interval)
        await getEvmSwap(orderId)
      }
    }, 1000)
  }
}

async function create(){
  // let details = {
  //   creator: document.getElementById("creator").value,
  //   receiver: document.getElementById("receiver").value,
  //   token: document.getElementById("token").value,
  //   amount: document.getElementById("amount").value,
  //   id: document.getElementById("id").value,
  //   hash: document.getElementById("unlockHash").value,
  //   lockTime: koinosLockTime
  // }
  //
  // if (details.creator.length == 0){
  //   document.getElementById("creator").focus()
  //   return;
  // }
  //
  // if (details.receiver.length == 0){
  //   document.getElementById("receiver").focus()
  //   return;
  // }
  //
  // if (details.amount.length == 0){
  //   document.getElementById("amount").focus()
  //   return;
  // }

  const swapContract = new Contract({
    id: "19emESA1R2kG9tVyHsbqwd4HW9VSoNPdSK",
    abi: KoinosSwapContractABI,
    provider: kondor.provider,
    signer: kondor.signer,
  });

  const { result } = await swapContract.functions.getSwap({
    id: "5605628383092"
  });
  console.log(result)
}

async function getEvmSwap(orderId){
  let swapContractAddress = await getContract()
  let swapContract = new web3.eth.Contract(SwapABI, swapContractAddress);
  let orderInfo = await swapContract.methods.swaps(orderId).call()
  let decimals = await (new web3.eth.Contract(ABI, orderInfo.token)).methods.decimals().call()
  document.getElementById("evm_creator").value = orderInfo.creator
  document.getElementById("evm_receiver").value = orderInfo.receiver
  document.getElementById("evm_token").value = orderInfo.token
  document.getElementById("evm_amount").value = orderInfo.amount / Math.pow(10, decimals) + ` (${orderInfo.amount})`
  document.getElementById("evm_expiration").value = new Date(Number(orderInfo.expiration) * 1000).toString().split("(")[0] + ` (${await countdown(orderInfo.expiration)})`
  document.getElementById("unlockHash").value = orderInfo.unlockHash

  let orderLockTime = orderInfo.expiration - orderInfo.createdAt
  koinosLockTime = lockTimes[orderLockTime]

  document.getElementById("lockTime").innerText = parseFloat(koinosLockTime / 86000).toFixed(1) + " days"
  return true;
}

async function countdown(timestamp){
  let now = new Date().getTime();
  let distance = (Number(timestamp) * 1000) - now;
  let days = Math.floor(distance / (1000*3600*24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return days + "d " + hours + "h "+ minutes + "m " + seconds + "s ";
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
