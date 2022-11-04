let CONTRACT = ""

async function main(){
  let account = await connectMetamask()
  let web3 = new Web3(window.ethereum)

  let token = document.getElementById("token").value
  let amount = document.getElementById("amount").value
  let creator = document.getElementById("creator").value

  let contract = new web3.eth.Contract(ABI, token);
  let allowance = await contract.methods.allowance(creator, CONTRACT).call()

  if (Number(allowance) < Number(amount)){
    alert("Allowance not sufficient")
    //show approve button
  }

  //create && deposit

}

async function connectMetamask(){
	if (typeof window.ethereum !== 'undefined') {
		let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
		return accounts[0];
	} else {
		alert("MetaMask is not installed!")
	}
}
