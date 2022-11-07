import { chain, System, Base58, Token, Crypto, claim, Arrays, StringBytes } from "@koinos/sdk-as";
import { swap } from "./proto/swap";

export class State {
  swapSpace: chain.object_space;

  constructor(contractId: Uint8Array) {
    this.swapSpace = new chain.object_space(false, contractId, 0);
  }

  getSwap(id: string): swap.swap_object {
    const swapObj = System.getObject<string, swap.swap_object>(this.swapSpace, id, swap.swap_object.decode);

    if (swapObj) {
      return swapObj;
    }

    return new swap.swap_object();
  }

  saveSwap(id: string, swapObj: swap.swap_object): void {
    System.putObject(this.swapSpace, id, swapObj, swap.swap_object.encode);
  }
}
