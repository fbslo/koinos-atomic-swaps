import { chain, System, Base58, Token, Crypto, claim, Arrays, StringBytes, Protobuf, MockVM, system_calls } from "@koinos/sdk-as";
import { Swap } from "../Swap";
import { swap } from "../proto/swap";

const TOKEN_CONTRACT_ID = Base58.decode('1FPiwDdVGhWb4iAvvdALVXY88rgvkAA5mT');
const CONTRACT_ID = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe");
const MOCK_ACCT1 = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqG");
const MOCK_ACCT2 = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqK");

describe("Atomic Swap", () => {
  MockVM.setContractId(TOKEN_CONTRACT_ID);
  let headInfo = new chain.head_info();
  headInfo.head_block_time = 123456789;
  headInfo.last_irreversible_block = 3;
  MockVM.setHeadInfo(headInfo);

  it("should create a Swap", () => {
    const s = new Swap();

    MockVM.setCallContractResults([new system_calls.exit_arguments(1)]);

    const args = new swap.createSwap_arguments(
      "7d8e031e97635f2bf27af96f5c1d899928e90376f24eb00dd467344a4f4aef97",
      Base58.decode("19emESA1R2kG9tVyHsbqwd4HW9VSoNPdSK"),
      Base58.decode("19emESA1R2kG9tVyHsbqwd4HW9VSoNPdSK"),
      Base58.decode("19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ"),
      1000,
      0,
      1000
    );

    const res = s.createSwap(args);

    console.log("add: " + res.id.toString());

    // expect(res.value).toBe(924);
  });
});
