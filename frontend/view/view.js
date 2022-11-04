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

async function getContract(){
  let contracts = {
    "0x1": "",     //Mainnet
    "0x89": "0x7c0d63083fDf3AC554eD0B85f08C7Fcb4e1b8Bd1",   //Polygon
    "0xA86A": "", //Avalanche
    "0x38": "",   //BSC
  }
  let chainId = window.ethereum.providerChainId

  return contracts[chainId]
}

async function load(){
  await getEvmSwap()
}

async function getEvmSwap(){
  let orderId = getParameterByName("id")
  let chain = chainIdentificator[orderId.slice(0, 5)]
  let web3 = new Web3(chainNodes[chain])

  let swapContract = new web3.eth.Contract(SwapABI, await getContract());
  let orderInfo = await swapContract.methods.swaps(orderId).call()
  console.log(orderInfo)
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
