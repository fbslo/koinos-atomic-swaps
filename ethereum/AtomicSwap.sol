//SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

interface IERC20 {
  function transfer(address to, uint256 amount) external;
  function transferFrom(address from, address to, uint256 amount) external;
  function balanceOf(address user) external returns (uint256);
}

error IdNotUnique(uint256 id);
error Expired();
error NotExpired();
error AlreadyFinalized();
error InvalidSecret();
error AddressZero();

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

  enum LockTime {
    3 days,
    5 days,
    7 days
  };

  event SwapCreated(uint256 id);
  event SwapCanceled(uint256 id);
  event SwapCompleted(uint256 id);

  function createSwap(
    uint256 id,
    bytes32 unlockHash,
    address receiver,
    address token,
    uint256 amount,
    LockTime lockTime
  ) external {
    if (swaps[id].creator != address(0)) revert IdNotUnique(id);
    if (receiver == address(0)) revert AddressZero();

    swaps[id] = Swap(unlockHash, msg.sender, receiver, token, amount, block.timestamp + lockTime, block.timestamp, false);
    IERC20(token).transferFrom(msg.sender, address(this), amount);
    emit SwapCreated(id);
  }

  function completeSwap(uint256 id, string memory secret) external {
    if (swaps[id].expiration >= block.timestamp) revert Expired();
    if (swaps[id].finalized == true) revert AlreadyFinalized();
    if (keccak256(abi.encodePacked(secret)) != swaps[id].unlockHash) revert InvalidSecret();

    swaps[id].finalized = true;
    IERC20(swaps[id].token).transfer(swaps[id].receiver, swaps[id].amount);
    emit SwapCompleted(id);
  }

  function cancelSwap(uint256 id) external {
    if (swaps[id].expiration > block.timestamp) revert NotExpired();
    if (swaps[id].finalized == true) revert AlreadyFinalized();

    swaps[id].finalized = true;
    IERC20(swaps[id].token).transfer(swaps[id].creator, swaps[id].amount);
    emit SwapCanceled(id);
  }
}
