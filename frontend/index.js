let buttons = `<div class="selection">
    <button class="button buttonCreate" onClick="showSelectChain()">Create Swap</button>
    <button class="button buttonCreate" onClick="showInputBox()">View Swap</button>
  </div>`

let selectChainButtons = `<div class="selection">
    <button class="button buttonCreate buttonLarge" id="bsc" onClick="redirect(this)">BNB Smart Chain</button>
    <button class="button buttonCreate buttonLarge" id="polygon" onClick="redirect(this)">Polygon</button>
    <button class="button buttonCreate buttonLarge" id="avax" onClick="redirect(this)">Avalanche</button>
  </div>`

let idInputBox = `
    <div class="center">
      <div class="description">Swap ID</div>
      <input type="text" id="id" name="Swap ID" placeholder="Swap ID"><p>
      <button class="button buttonCreate" id="action-button" onclick="main()">View</button>
    </div>`

let creationForm = `
<div style="width: 100%;">
   <div class="split">
     <form class="" action="index.html" method="post">
       <h1>BSC</h1><p>
       <input type="text" name="Creator Address" placeholder="Creator Address"><p>
       <input type="text" name="Receiver Address" placeholder="Receiver Address"><p>
       <input type="text" name="Token Address" placeholder="Token Address"><p>
       <input type="text" name="Token Amount" placeholder="Token Amount"><p>
     </form>
   </div>
   <div class="split">
     <form class="" action="index.html" method="post">
       <h1>Koinos</h1><p>
       <input type="text" name="Creator Address" placeholder="Creator Address"><p>
       <input type="text" name="Receiver Address" placeholder="Receiver Address"><p>
       <input type="text" name="Token Address" placeholder="Token Address"><p>
       <input type="text" name="Token Amount" placeholder="Token Amount"><p>
     </form>
   </div>
</div>
<div class="center">
  <div class="description">Swap ID</div>
  <input type="text" name="Swap ID" placeholder="Swap ID"><p>
    <div class="description">Swap Secret</div>
  <input type="text" name="Swap Secret" placeholder="Swap Secret"><p>
    <div class="description">Unlock Hash</div>
  <input type="text" name="Unlock Hash" placeholder="Unlock Hash"><p>
  <button class="button buttonCreate">Create</button>
</div>`

async function load(){
  let content = document.getElementById("content")
  content.innerHTML = buttons
}

async function showSelectChain(){
  content.innerHTML = buttons + selectChainButtons
}

async function showInputBox(){
  content.innerHTML = buttons + idInputBox
}

async function redirect(x){
  window.location = "/create?chain="+x.id;
}
