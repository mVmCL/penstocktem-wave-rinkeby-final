import React, {useEffect, useState} from 'react';
import "./App.css"
// import Form from './components/Form'
import {ethers} from 'ethers'
import abi from './utils/Penstocktem.json'
import logo from './particles.jpg'

const App = () => {


/* Contracts previous
*0xD6fcC9aAa9B13daBc8cE1350f68dfD5D8e3e2025
*0x85DCF64544E5aB31EdD36FE02b6Bf9d99f5e0d78
*0xc23AE69c383a9bc8124B5b1F29Ca813eCdd7d237
*0x9cA95Be5CC49b325340E32778161ed5efeE74ca1
*0x4f830EC261f8b2e17415a4690F3c17a7E3334bf4
*0x0dCe721a300FCB178e7efde20E1CFb00B943046a


*/


const [currentAccount, setCurrentAccount] = useState('');
const [message, setMessage]= useState('');
const [allWaves, setAllWaves]= useState([]);
const contractAddress="0x0fdE8a7F639d00184B0A8D5483dB18b96951ff6B";
const contractABI = abi.abi


//Getting all the waves from the contract
const getAllWaves = async () =>{
  try{
    const {ethereum} = window;
    if(ethereum){
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const penstocktemContract = new ethers.Contract(contractAddress, contractABI, signer);


      const waves = await penstocktemContract.getAllWaves();


      let wavesCleaned = [];
      waves.forEach(wave =>{
        wavesCleaned.push({
          address: wave.waver,
          timestamp: new Date(wave.timestamp * 1000),
          message: wave.message,
        });
      });


      setAllWaves(wavesCleaned);
    }else{
      console.log("Ethereum object does not exist")
    }
  }catch (error){
    console.log(error);
  }
}





const IsWalletConnected = async () =>{
  try{
  const {ethereum} = window;

  if(!ethereum){
    console.log("You'll need a MetaMask to use this site.")
    return;
  }else{
    console.log("Ethereum object found ::: ["+ ethereum+"]")
  }
  const accounts = await ethereum.request({ method: "eth_accounts"});

if(accounts.length !==0) {
  const account = accounts[0];
  console.log("Found a wallet with this address: ", account);
  setCurrentAccount(account)
  getAllWaves();

}else{
  console.log("There isn't an account that was found/authorized")
}

}catch(error){
  console.log(error);
}}



const connectWallet = async () => {
  try{
    const {ethereum} = window;


    if(!ethereum){
      alert("You'll need a MetaMask to use this site...");
      return;
    }

    const accounts = await ethereum.request({method: "eth_requestAccounts"});

    console.log("Connected to ", accounts[0]);
    setCurrentAccount(accounts[0]);

  }catch(error){
    console.log(error)
  }
}

const wave = async (message) => {
  try{ 
    const {ethereum} = window;

    if (ethereum){
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const penstocktemContract = new ethers.Contract(contractAddress, contractABI, signer);
     let count = await penstocktemContract.getTotalWaves();
 console.log("The total wave count from this address is: ", count.toNumber());
                const waveTxn = await penstocktemContract.wave(message, {gasLimit: 300000 });//so leftover money can be returned to the user
                console.log("Mining the wave:  ", waveTxn.hash);

                await waveTxn.wait();
                console.log("Mined the wave: ", waveTxn.hash);
               
        
                count = await penstocktemContract.getTotalWaves();
                console.log("The total wave count for this address is: ", count.toNumber());
 
     await penstocktemContract.getAllWaves();
    } else{
      console.log("Ethereum object does not exist");
    }
  }catch(error){
    console.log(error)
  }
}





const handleSubmit = (e) => {
  e.preventDefault();
  wave(message);
  setMessage('');
}


useEffect(() =>{

IsWalletConnected();


},[])

return(
<>



<div className='App'>


<div className="App-header"><p>PeNsToCk|t|e|M</p>
  <img src={logo} className='App-logo' alt=''/>
<div className="header">Welcome to my first blockchain connection!</div>

  
<span>{' '}</span>



{!currentAccount && (
  <button className="waveButton" onClick={connectWallet}>Connect Wallet</button>
)}







  
  {/* // <Form onSubmit={handleSubmit} /> */}
<form onSubmit={handleSubmit} > 
     
       <label htmlFor="message"> Send a message</label>
   <textarea type='text' name="message" id="message" value={message} onChange={(e) => setMessage(e.target.value)}/>

<button type='submit' className="waveButton" >Wave!👋</button> 
</form>
<button type='submit' className="waveButton" onClick={wave} >Just Send The Wave!👋</button>

{allWaves.map((wave, index) =>{
  return (
    <div className='messageIndex' key={index}style={{backgroundColor: 'OldLace', marginTop: '16px', padding:'8px'}} >

                <div className='formItem'>Address: {(wave).address}</div>
                <div className='formItem'>Time: {(wave).timestamp.toString()}</div>
                <div className='formItem'>Message: {(wave).message}</div>


      </div>
  )
})}

</div>
</div>
</>


);

}
export default App;