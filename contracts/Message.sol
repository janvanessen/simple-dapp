// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.8.0;

contract Message {
    string message;

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

}