//SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

interface IERC20 {
  function transfer(address to, uint256 amount) external;
  function transferFrom(address from, address to, uint256 amount) external;
  function balanceOf(address user) external returns (uint256);
}

contract HTLC {
  struct Swap {
    bytes32 unlockHash;
    address creator;
    address receiver;
    address token;
    uint256 amount;
    uint256 expiration;
    uint256 createdAt;
    bool finalized;
  }
  mapping (uint256 => Swap) public swaps;

  uint256 public lockTime = 5 days;

  event SwapCreated(uint256 id);
  event SwapCanceled(uint256 id);
  event SwapCompleted(uint256 id);

  function createASwap(
    uint256 id,
    bytes32 unlockHash,
    address receiver,
    address token,
    uint256 amount
  ) external {
    require(swaps[id].creator == address(0), "ID not unique");

    IERC20(token).transferFrom(msg.sender, address(this), amount);
    swaps[id] = Swap(unlockHash, msg.sender, receiver, token, amount, block.timestamp + lockTime, block.timestamp, false);
    emit SwapCreated(id);
  }

  function completeSwap(uint256 id, string memory secret) external {
    require(swaps[id].expiration <= block.timestamp, "expired");
    require(swaps[id].finalized == false, "already finalized");
    require(keccak256(abi.encodePacked(secret)) == swaps[id].unlockHash, "invalid secret");

    swaps[id].finalized = true;
    IERC20(swaps[id].token).transfer(swaps[id].receiver, swaps[id].amount);
    emit SwapCompleted(id);
  }

  function cancelSwap(uint256 id) external {
    require(msg.sender == swaps[id].creator, "not a creator");
    require(block.timestamp > swaps[id].expiration, "not exipred");
    require(swaps[id].finalized == false, "already finalized");

    swaps[id].finalized = true;
    IERC20(swaps[id].token).transfer(swaps[id].creator, swaps[id].amount);
    emit SwapCanceled(id);
  }
}
