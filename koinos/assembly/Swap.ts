import { chain, System, Base58, Token, Crypto, claim, Arrays, StringBytes, Protobuf } from "@koinos/sdk-as";
import { swap } from "./proto/swap";
import { State } from "./State";

const TOKEN_CONTRACT_ID = Base58.decode('19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ');
enum LockTime {
  0 = 172800, //2.0 days
  1 = 302400, //3.5 days
  2 = 432000  //4.0 days
}

export class Swap {
  _contractId: Uint8Array;
  _state: State;
  _token: Token;

  constructor() {
    this._contractId = System.getContractId();
    this._state = new State(this._contractId);
    this._token = new Token(TOKEN_CONTRACT_ID);
  }

  createSwap(args: swap.createSwap_arguments): swap.createSwap_result {
    const id = args.id;
    const res = new swap.createSwap_result(0);
    const creator = args.creator as Uint8Array;

    if ((this._state.getSwap(id)).creator != null) {
      System.log("ID not unique");
      return res;
    }

    if (!this._token.transfer(creator, this._contractId, args.amount)) {
      System.log("Token transfer from creator failed");
      return res;
    }

    const newSwap = new swap.swap_object(
      args.unlockHash,
      args.creator,
      args.receiver,
      args.token,
      args.amount,
      System.getHeadInfo().head_block_time + LockTime[args.lockTime],
      System.getHeadInfo().head_block_time,
      false,
      args.id
    );
    this._state.saveSwap(id, newSwap);

    System.event('atomicSwap.createSwap', Protobuf.encode(new swap.create_event(id), swap.create_event.encode), [creator]);

    res.id = id;
    return res;
  }

  completeSwap(args: swap.completeSwap_arguments): swap.completeSwap_result {
    const currentTime = System.getHeadInfo().head_block_time;
    const swapObj = this._state.getSwap(args.id);

    if (currentTime > swapObj.expiration){
      System.log("Expired");
      return new swap.completeSwap_result(false);
    }

    if (swapObj.finalized != false){
      System.log("Already finalized");
      return new swap.completeSwap_result(false);
    }

    const secretHash = System.hash(Crypto.multicodec.keccak_256, StringBytes.stringToBytes(args.secret!));

    if (secretHash != swapObj.unlockHash){
      System.log("Invalid secret");
      return new swap.completeSwap_result(false);
    }

    if (!this._token.transfer(this._contractId, swapObj.receiver as Uint8Array, swapObj.amount)) {
      System.log('Token transfer to receiver failed');
      return new swap.completeSwap_result(false);
    }

    swapObj.finalized = true;
    this._state.saveSwap(swapObj.id, swapObj);

    System.event('atomicSwap.completeSwap', Protobuf.encode(new swap.complete_event(swapObj.id), swap.complete_event.encode), [swapObj.receiver as Uint8Array]);

    return new swap.completeSwap_result(true);
  }

  cancelSwap(args: swap.cancelSwap_arguments): swap.cancelSwap_result {
    const currentTime = System.getHeadInfo().head_block_time;
    const swapObj = this._state.getSwap(args.id);

    if (currentTime <= swapObj.expiration){
      System.log("Not expired");
      return new swap.cancelSwap_result(false);
    }

    if (swapObj.finalized != false){
      System.log("Already finalized");
      return new swap.cancelSwap_result(false);
    }

    if (!this._token.transfer(this._contractId, swapObj.creator as Uint8Array, swapObj.amount)) {
      System.log('Token transfer to creator failed');
      return new swap.cancelSwap_result(false);
    }

    swapObj.finalized = true;
    this._state.saveSwap(swapObj.id, swapObj);

    System.event('atomicSwap.cancelSwap', Protobuf.encode(new swap.cancel_event(swapObj.id), swap.cancel_event.encode), [swapObj.creator as Uint8Array]);

    return new swap.cancelSwap_result(true);
  }
}
