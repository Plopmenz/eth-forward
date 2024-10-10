// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EthForward {
    error ForwardFailed(address from, address receiver, uint256 value);

    event Forwarded(address indexed from, address indexed receiver, uint256 value);

    function forward(address payable receiver) external payable {
        (bool success,) = receiver.call{value: msg.value}("");
        if (!success) {
            revert ForwardFailed(msg.sender, receiver, msg.value);
        }
        emit Forwarded(msg.sender, receiver, msg.value);
    }
}
