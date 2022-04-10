// SPDX-License_Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Penstocktem {

  uint256 totalWaves;

//use below to generate a random number
uint256 private seed;

  event NewWave(address indexed from, uint256 timestamp, string message);

      struct Wave {
      address waver; //address of the person that waved
      string message; //the message that the user sent
      uint256 timestamp; //when this was done
    }


    //this lets storing an array of structs possible
    Wave[] waves;
mapping(address => uint256) public lastWavedAt;

  constructor() payable{
    console.log("PeNsToCk|t|e|M|__cccCCmVmClXsTONEzCCcccc");
    seed = (block.timestamp + block.difficulty) % 100;
  }


  function wave(string memory _message) public {

    require(
      lastWavedAt[msg.sender] + 30 seconds < block.timestamp,
    "Wait 30s... ok?"
    );

    lastWavedAt[msg.sender] = block.timestamp;

    totalWaves += 1;
    console.log("%s has waved with message %s", msg.sender);
    
    //store the waves in the array
    waves.push(Wave(msg.sender, _message, block.timestamp));
    

    //new seed generation for next user who waves
    seed = (block.difficulty + block.timestamp + seed) % 100;
    console.log("Random # generated: %d", seed);

    //give 50% chance to the user to win the prize
    if(seed <= 50) {
      console.log("%s won!", msg.sender);

      //repeat the same code as before the prize
      uint256 prizeAmount = 0.0001 ether;
      require(
        prizeAmount <= address(this).balance,
        "Trying to withdraw more money than the contract has."
      );
      (bool success, ) = (msg.sender).call{value: prizeAmount}("");
      require(success, "Failed to withdraw money from the contract.");
    }

    emit NewWave(msg.sender, block.timestamp, _message);
  }
// uint256 prizeAmount = 0.0001 ether;
// require(
//   prizeAmount <= address(this).balance,
//   "Trying to withdraw more money than the contract has."
// );
// (bool success, ) = (msg.sender).call{value: prizeAmount}('');//sends the money
// require(success, "Failed to withdraw money from the contract.");//needs require

function getAllWaves() public view returns (Wave[] memory) {
  return waves;
}
function getTotalWaves() public view returns (uint256) {
  return totalWaves;
}
    }



  
//this is supposed to make it easier to retrieve the waves from the front end
// function getAllWaves() public view returns (Wave[] memory){
//   return waves;
// }



//   function getTotalWaves() public view returns (uint256) {
//     console.log("We have %d total waves!", totalWaves);
//     return totalWaves;
//   }}
