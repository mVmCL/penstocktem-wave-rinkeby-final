const main = async() =>{  
   const waveContractFactory = await hre.ethers.getContractFactory("Penstocktem")
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),//this takes the .1 ether from me in this example to fund contract
  });  
  await waveContract.deployed();
   console.log("Contract Address: ", waveContract.address);
    
  // const [owner] = await hre.ethers.getSigners();
    
  //    console.log("Contract deployed by: ", owner.address);
  
let contractBalance = await hre.ethers.provider.getBalance(
  waveContract.address
);
console.log(
  "Contract Balance: ", hre.ethers.utils.formatEther(contractBalance)
);
 
  


  // let waveCount;   
  //   waveCount = await waveContract.getTotalWaves();
  //   console.log(waveCount.toNumber());

//sending waves
    let waveTxn = await waveContract.wave("waveTxn Message....");
    await waveTxn.wait();//wait for the transaction to be mined

    let waveTxn2 = await waveContract.wave("waveTxn Message 2...")
    await waveTxn2.wait();



    //Get the contract balance
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance)
  );

//     const [_, randomPerson] = await hre.ethers.getSigners();
//     waveTxn = await waveContract.connect(randomPerson).wave("waveTxn Message 2.....");
//     await waveTxn.wait()//waiting for txn to be mined


    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
};


  //   console.log(waveCount.toNumber());
  //   await waveTxn.wait();
  //   waveCount = await waveContract.getTotalWaves();
  // };


  
  const runMain = async () => {
  try{
    await main ();
    process.exit(0)//no error
  }catch(error){
    console.log(error);
    process.exit(1)//error
  }
  }  ;
  
  runMain();
  
   
  