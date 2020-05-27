import React, {Component, useState} from "react";
import "./App.css";
import AudioAnalyser from "react-audio-analyser";
import 'tachyons';
const Demo=(props)=>{
    // const[status,setStatus]=useState("");
    const[audioType,setAudioType]=useState("audio/wav");
    const[audioSrc,setAudioSrc]=useState("");
    // const controlAudio=(status)=>{
    //     setStatus(status)
    //     // console.log(status)
    // }
    const changeScheme=(e)=>{
        setAudioType(e.target.value);
    }
    return(
        <div class="record">
                <AudioAnalyser
                    status={props.status}
                    audioType = {audioType}
                    timeslice = {1000}
                    audioSrc={audioSrc}
                    className="center"
                    startCallback={ (e) => {
                        console.log("succ start", e)
                    }}

                    pauseCallback={ (e) => {
                        console.log("succ pause", e)
                    }}
                    stopCallback={ (e) => {
                       
                        // console.log("succ stop", e)
                        // window.URL.createObjectURL(e);
                        // console.log('url is: ',window.URL.createObjectURL(e))

                        console.log('base64 encoded: ',window.btoa(window.URL.createObjectURL(e)))

                        {props.onCallFiles(window.URL.createObjectURL(e))}
                        
                    }}
                    onRecordCallback={ (e) => {
                        console.log("recording", e)
                    }}
                    errorCallback={ (err) => {
                        console.log("error", err)
                    }}
                    />


                
                    
                        
                        
                    
                {/* </AudioAnalyser> */}
                {/* <p >choose output type</p>
                <select class="w-100 f6 h2 bg-white mb2 dib ma1 b--black-20" name="" id="" onChange={(e) => changeScheme(e)} value={audioType}>
                     <option value="audio/mp3">audio/mp3</option>
                    <option value="audio/webm">audio/webm（default）</option>
                    <option value="audio/wav">audio/wav</option>
                    
                </select> */}
            </div>
    )
}

export default Demo;