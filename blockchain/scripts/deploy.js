const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("Penstocktem");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
  });
  await waveContract.deployed();
  console.log("Penstocktem contract address: ", waveContract.address);
};

    // const [deployer] = await hre.ethers.getSigners();
    // const accountBalance = await deployer.getBalance();  
    // console.log("Deploying contracts with account: ", deployer.address);
    // console.log("Account balance: ", accountBalance.toString());  
    // const waveContractFactory = await hre.ethers.getContractFactory("Penstocktem");
    // const waveContract = await waveContractFactory.deploy();
    // await waveContract.deployed();
  //   console.log("Penstocktem address: ", waveContract.address);
  // };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();