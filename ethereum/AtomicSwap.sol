pragma solidity ^0.8.13;

interface IERC20 {
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
  }
  mapping (uint256 => Swap) public swaps;

  uint256 public lockTime = 7 days;

  event SwapCreated(uint256 id);
  event SwapCanceled(uint256 id);
  event SwapCompleted(uint256 id);

  function createASwap(
    uint256 id;
    bytes32 unlockHash,
    address receiver,
    address token,
    uint256 amount
  ) external {
    require(swaps[id].creator == address(0), "ID not unique");
    
    IERC20(token).transferFrom(msg.sender, address(this), amount);
    swaps[id] = Swap(unlockHash, msg.sender, receiver, token, amount, block.timestamp + lockTime, block.timestamp);
    emit SwapCreated(id);
  }

  function cancelSwap(){

  }
}
