import { chain, System, Base58, Token, Crypto, claim, Arrays, StringBytes } from "@koinos/sdk-as";
import { swap } from "./proto/swap";

export class State {
  swapSpace: chain.object_space;

  constructor(contractId: Uint8Array) {
    this.swapSpace = new chain.object_space(false, contractId, 0);
  }

  getSwap(id: u64): swap.swap_object {
    const swapObj = System.getObject<string, swap.swap_object>(this.swapSpace, id.toString(), swap.swap_object.decode);

    if (swapObj) {
      return swapObj;
    }

    return new swap.swap_object();
  }

  saveSwap(id: u64, swapObj: swap.swap_object): void {
    System.putObject(this.swapSpace, id.toString(), swapObj, swap.swap_object.encode);
  }
}
