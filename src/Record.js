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

                        const file=new Audio(window.URL.createObjectURL(e))
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


                
                    
                        {/* <button className="iconfont icon-stop w-30 center" title="停止"
                           onClick={() => controlAudio("inactive")}>stop</button>
                        {status !== "recording" &&
                        <button className="iconfont icon-start w-30 center " title="开始"
                           onClick={() => controlAudio("recording")}>start</button>}
                        {status === "recording" &&
                        <button className="iconfont icon-pause" title="暂停"
                           onClick={() => controlAudio("paused")}>pause</button>} */}
                        
                    
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
// class Demo extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             status: ""
//         }
//     }
 
//     componentDidMount() {
//     }
 
//     controlAudio(status) {
//         this.setState({
//             status
//         })
//     }
 
//     changeScheme(e) {
//         this.setState({
//             audioType: e.target.value
//         })
//     }
 
//     render() {
//         const {status, audioSrc, audioType} = this.state;
//         const audioProps = {
//             audioType,
//             // audioOptions: {sampleRate: 30000}, // 设置输出音频采样率
//             status,
//             audioSrc,
//             timeslice: 1000, // timeslice（https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#Parameters）
//             startCallback: (e) => {
//                 console.log("succ start", e)
//             },
//             pauseCallback: (e) => {
//                 console.log("succ pause", e)
//             },
//             stopCallback: (e) => {
//                 this.setState({
//                     audioSrc: window.URL.createObjectURL(e)
//                 })
//                 console.log("succ stop", e)
//             },
//             onRecordCallback: (e) => {
//                 console.log("recording", e)
//             },
//             errorCallback: (err) => {
//                 console.log("error", err)
//             }
//         }
//         return (
//             <div>
//                 <AudioAnalyser {...audioProps}>
//                     <div className="btn-box">
//                         {status !== "recording" &&
//                         <button className="iconfont icon-start" title="开始"
//                            onClick={() => this.controlAudio("recording")}></button>}
//                         {status === "recording" &&
//                         <button className="iconfont icon-pause" title="暂停"
//                            onClick={() => this.controlAudio("paused")}></button>}
//                         <button className="iconfont icon-stop" title="停止"
//                            onClick={() => this.controlAudio("inactive")}></button>
//                     </div>
//                 </AudioAnalyser>
//                 <p>choose output type</p>
//                 <select name="" id="" onChange={(e) => this.changeScheme(e)} value={audioType}>
//                     <option value="audio/webm">audio/webm（default）</option>
//                     <option value="audio/wav">audio/wav</option>
//                     <option value="audio/mp3">audio/mp3</option>
//                 </select>
//             </div>
//         );
//     }
// }
export default Demo;