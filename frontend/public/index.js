let buttons = `<div class="selection">
    <button class="button buttonCreate" onClick="showSelectChain()">Create Swap</button>
    <button class="button buttonCreate" onClick="showInputBox()">View Swap</button>
  </div>`

let selectChainButtons = `<div class="selection">
    <button class="button buttonCreate buttonLarge" id="bsc" onClick="redirect('create', this)">BNB Smart Chain</button>
    <button class="button buttonCreate buttonLarge" id="polygon" onClick="redirect('create', this)">Polygon</button>
    <button class="button buttonCreate buttonLarge" id="avax" onClick="redirect('create', this)">Avalanche</button>
  </div>`

let idInputBox = `
    <div class="center">
      <div class="description">Swap ID</div>
      <input type="text" id="id" name="Swap ID" placeholder="Swap ID"><p>
      <button class="button buttonCreate" id="action-button" onclick="redirect('view')">View</button>
    </div>`

async function load(){
  let content = document.getElementById("content")
  content.innerHTML = buttons

  if (!window.localStorage.getItem('disclaimer') || new Date().getTime() - window.localStorage.getItem('disclaimer') > 604800000){
    Swal.fire(
      'Warning',
      'This app is still under development!<p>Use at your own risk!',
      'warning'
    ).then(() => {
      window.localStorage.setItem('disclaimer', new Date().getTime());
    })
  }
}

async function showSelectChain(){
  content.innerHTML = buttons + selectChainButtons
}

async function showInputBox(){
  content.innerHTML = buttons + idInputBox
}

async function redirect(location, x){
  let loc = "/"+location
  if (location == "create") loc += "?chain="+x.id;
  if (location == "view") loc += "?id="+document.getElementById("id").value

  window.location = loc;
}
