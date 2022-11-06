async function orderExpired(orderId, chain, koinosSwapContract, swapContractEvm, koinosOrder, evmOrder){
  document.getElementById("creator").readOnly = true
  document.getElementById("receiver").readOnly = true
  document.getElementById("token").readOnly = true
  document.getElementById("amount").readOnly = true
  document.getElementById("secret").readOnly = true
  document.getElementById("secret").value = `[N/A]`

  if (!evmOrder.finalized){
    document.getElementById("buttons").innerHTML = `
      <button class="button buttonCancel" id="mainButton" onClick="cancelEvm()">Cancel on ${chainNames[chain]}</button>
    `
  }

  if (!koinosOrder.finalized){
    document.getElementById("buttons").innerHTML += `
      <button class="button buttonCancel" id="mainButton" onClick="cancelKoinos()">Cancel on Koinos</button>
    `
  }

  document.getElementById("koinos-checkmark").innerHTML = `<i class="fa fa-times fa-1x" aria-hidden="true"></i>`
  document.getElementById("evm-checkmark").innerHTML = `<i class="fa fa-times fa-1x" aria-hidden="true"></i>`
}

async function cancelKoinos(){
  let payer = (await kondor.getAccounts())[0].address

  const result = await swapContract.functions.cancelSwap({
    id: koinosOrder.id,
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
}

async function cancelEvm(){
  let data = await swapContractEvm.methods.cancelSwap(id).encodeABI()
  let toContract = await getContract(chain)

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
