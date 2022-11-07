import { chain, System, Base58, Token, Crypto, claim, Arrays, StringBytes, Protobuf, authority } from "@koinos/sdk-as";
import { swap } from "./proto/swap";
import { State } from "./State";

const IS_UPGRADEABLE = true;

export class Swap {
  _contractId: Uint8Array;
  _state: State;

  authorize(args: authority.authorize_arguments): authority.authorize_result {
    return new authority.authorize_result(IS_UPGRADEABLE);
  }

  constructor() {
    this._contractId = System.getContractId();
    this._state = new State(this._contractId);
  }

  createSwap(args: swap.createSwap_arguments): swap.createSwap_result {
    const id = args.id;
    const res = new swap.createSwap_result(0);
    const creator = args.creator as Uint8Array;

    if ((this._state.getSwap(id)).creator != null) {
      System.log("ID not unique");
      return res;
    }

    const token = new Token(args.token!);

    System.require(token.transfer(creator, this._contractId, args.amount), "Token transfer from creator failed");

    const newSwap = new swap.swap_object(
      args.unlockHash!,
      args.creator!,
      args.receiver!,
      args.token!,
      args.amount,
      System.getHeadInfo().head_block_time + args.lockTime,
      System.getHeadInfo().head_block_time,
      false,
      id,
      ""
    );
    this._state.saveSwap(id, newSwap);

    System.event('atomicSwap.createSwap', Protobuf.encode(new swap.create_event(id), swap.create_event.encode), [creator]);

    res.id = id;
    return res;
  }

  completeSwap(args: swap.completeSwap_arguments): swap.completeSwap_result {
    const currentTime = System.getHeadInfo().head_block_time;
    const swapObj = this._state.getSwap(args.id);
    const unlockHash = swapObj.unlockHash;

    if (currentTime >= swapObj.expiration){
      System.log("Expired");
      return new swap.completeSwap_result(false);
    }

    if (swapObj.finalized == true){
      System.log("Already finalized");
      return new swap.completeSwap_result(false);
    }

    const secretHash = System.hash(Crypto.multicodec.keccak_256, StringBytes.stringToBytes(args.secret!));

    if (Arrays.toHexString(secretHash!, false).slice(4) != unlockHash){
      System.log("Invalid secret");
      return new swap.completeSwap_result(false);
    }

    swapObj.finalized = true;
    swapObj.secret = args.secret;
    this._state.saveSwap(swapObj.id, swapObj);

    const token = new Token(swapObj.token!);

    System.require(token.transfer(this._contractId, swapObj.receiver as Uint8Array, swapObj.amount), "Token transfer to receiver failed");

    System.event('atomicSwap.completeSwap', Protobuf.encode(new swap.complete_event(swapObj.id, args.secret), swap.complete_event.encode), [swapObj.receiver as Uint8Array]);

    return new swap.completeSwap_result(true);
  }

  cancelSwap(args: swap.cancelSwap_arguments): swap.cancelSwap_result {
    const currentTime = System.getHeadInfo().head_block_time;
    const swapObj = this._state.getSwap(args.id);

    if (swapObj.expiration > currentTime){
      System.log("Not expired");
      return new swap.cancelSwap_result(false);
    }

    if (swapObj.finalized == true){
      System.log("Already finalized");
      return new swap.cancelSwap_result(false);
    }

    swapObj.finalized = true;
    this._state.saveSwap(swapObj.id, swapObj);

    const token = new Token(swapObj.token!);

    System.require(token.transfer(this._contractId, swapObj.creator as Uint8Array, swapObj.amount), "Token transfer to creator failed");

    System.event('atomicSwap.cancelSwap', Protobuf.encode(new swap.cancel_event(swapObj.id), swap.cancel_event.encode), [swapObj.creator as Uint8Array]);

    return new swap.cancelSwap_result(true);
  }

  getSwap(args: swap.getSwap_arguments): swap.getSwap_result {
    let swapObj = this._state.getSwap(args.id);
    return new swap.getSwap_result(
      swapObj.unlockHash,
      swapObj.creator,
      swapObj.receiver,
      swapObj.token,
      swapObj.amount,
      swapObj.expiration,
      swapObj.createdAt,
      swapObj.finalized,
      swapObj.id,
      swapObj.secret
    );
  }
}
