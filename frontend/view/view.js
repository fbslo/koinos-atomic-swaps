let chainNodes = {
  "bsc": "https://bsc-dataseed1.binance.org/",
  "polygon": "https://polygon-rpc.com/",
  "avax": "https://api.avax.network/ext/bc/C/rpc"
}

let chainIdentificator = {
  "10101": "eth",
  "56056": "polygon",
  "43114": "avax",
  "38038": "bsc"
}

async function load(){

}

async function getEvmSwap(){
  let orderId = getParameterByName(id)
  let chain = chainIdentificator[orderId.slice(0, 5)]
  let web3 = new Web3(chainNodes[chain])

  
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
