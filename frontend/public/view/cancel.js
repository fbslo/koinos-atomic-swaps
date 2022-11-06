async function orderExpired(orderId, chain, koinosSwapContract, swapContractEvm, koinosOrder, evmOrder){
  document.getElementById("creator").readOnly = true
  document.getElementById("receiver").readOnly = true
  document.getElementById("token").readOnly = true
  document.getElementById("amount").readOnly = true
  document.getElementById("secret").readOnly = true

console.log('here')

  document.getElementById("mainButton").innerText = 'Completed'
  document.getElementById("mainButton").classList.add("complete-button");
  document.getElementById("mainButton").onclick = false;

  document.getElementById("secret").value = koinosOrder.secret
  document.getElementById("secret").readOnly = true

  document.getElementById("koinos-checkmark").innerHTML = `<i class="fa fa-check fa-1x" aria-hidden="true"></i>`
  document.getElementById("evm-checkmark").innerHTML = `<i class="fa fa-check fa-1x" aria-hidden="true"></i>`
}
