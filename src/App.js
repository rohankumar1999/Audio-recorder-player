import React,{Component} from 'react';
import {useState,useEffect} from 'react';
import { ReactMic } from 'react-mic';
import './App.css'      //css file for styling
import 'tachyons'


const App=(props)=>{
  const [Url,setUrl]=useState(null)       //state variable Url to contain the recorded audio's url
  const [record,setRecord]=useState(false); // state variable record to determine if the audio is being recorded
  // const[play,setPlay]=useState(false);
  const startRecording = () => {
    setRecord(true);
  }
 
  const stopRecording = () => {   //handler function to set state variable to false
   setRecord(false);
  }
 
  
 
  const onStop=(recordedBlob)=> {   //method to be invocated after recording
    
    setUrl(recordedBlob.blobURL);
    
  
    
  }
  const startPlaying=()=>{
   
    const file=new Audio(Url);
    file.play();
  }
  const play_button= <button type="button" className=" w-20 center f6 link grow ph3 pv2 mb2 dib white bg-purple " onClick={startPlaying} >Play</button>
  
  
    return (
      <div class="mic">
        <ReactMic
          record={record}         //true begins recording and vice versa
          className="sound-wave w-40 center"
          onStop={onStop}         //determines the action to be taken after the audio stops recording
          strokeColor="#000000"
          backgroundColor="#800080"/>
                    {/* //button to start recording */}
        <button className=" w-20 center f6 link grow ph3 pv2 mb2 dib white bg-purple" onClick={startRecording} type="button">Start</button>
                     {/* //button to stop recording      */}
        <button className=" w-20 center f6 link grow ph3 pv2 mb2 dib white bg-purple " onClick={stopRecording} type="button">Stop</button>
                      {/* conditionally rendering the play button after reccrding is completed */}
        {!record?play_button:null}
      </div>
    );
  
}


export default App;
