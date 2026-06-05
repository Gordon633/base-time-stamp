// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BaseTimeStamp {
    mapping(address => uint256) public lastStamp;
    mapping(address => uint256) public stampCount;
    uint256 public totalStamps;

    event Stamped(address indexed user, uint256 timestamp, uint256 userStamps, uint256 totalStamps);

    function stamp() external {
        lastStamp[msg.sender] = block.timestamp;

        unchecked {
            stampCount[msg.sender] += 1;
            totalStamps += 1;
        }

        emit Stamped(msg.sender, block.timestamp, stampCount[msg.sender], totalStamps);
    }
}
