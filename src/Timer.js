import React, { useState, useEffect } from 'react';
import {AiFillPlaySquare,AiFillPauseCircle,AiFillCloseCircle} from 'react-icons/ai'
import {FaStopCircle} from 'react-icons/fa'
import AudioAnalyser from "react-audio-analyser";
import 'tachyons'
import Demo from './Record'
const Timer = () => {
  const [seconds, setSeconds] = useState(3);
  const [st, setSt] = useState("");
  const [files,setFiles]=useState([])
  const toggle=(st)=> {
    setSt(st);
  }

  const reset=() =>{
    setSeconds(3);
    // setSt("incactive");
  }
  
  useEffect(() => {
    let interval = null;
    if(seconds===0){
        toggle("inactive")
        reset();
    }
    if (st==="recording") {
      interval = setInterval(() => {
        
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (st==="paused" && seconds !== 3) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [st, seconds]);
  
const callFiles=(f)=>{
    const list=[]
    const newArray=files.forEach((fi)=>{
        list.push(fi);
    })
    list.push(f)
    setFiles(list)

}


const triggerDelete=(f,index)=>{
    // alert('removing')
    // console.log(document.getElementById("app"))
    // document.getElementById(`file${index}`).style.display="none";
    // delete files[index]
    
    // setFiles(delete files[index])
    // console.log('attempting to delete: ',ind)
    if(window.confirm("Are you sure that you want to delete?")){
        // var newList=[]
        // newList=files.forEach((fi,i)=>{
        //     if(i!==ind){
        //         return fi;
        //     }
        // })
        var it
        var newList=[]
        for(it=0;it<files.length;it++){
                if(files[it]!==f){
                    newList.push(files[it]);
                }
        }
        setFiles([...newList])
    }
    
}
  return (
    <div className="center h-5 w-50 br3  bg-light-blue pa3 dib" style={{width: '100%', height: '100%', backgroundColor: 'powderblue'}}>
      <div className="ph3 pv2 mb2 dib white bg-black" style={{ fontSize: '250%' ,display:'flex',justifyContent:'center'}}>
        {seconds}s
      </div>
      <div className="files pa3" style={{display:'flex',flexDirection:'row'}}>
      {files.map((f,index)=><div class={`file${index}`} key={f.toString()} >
          <button className="w-2 center f6 link grow  white bg-black" style={{height:'2rem',width:'2rem',borderRadius:'60%'}} onClick={()=>{
            //   alert('removing');
            //   delete files[index]
              triggerDelete(f,index)
          }}><AiFillCloseCircle/></button>
          <audio controls autoplay name="media"><source src={f} type="audio/wav"></source></audio>
          </div>
      )}
      </div>
      
      
      <Demo status={st}  onCallFiles={callFiles}/>


      
      <div className="row" style={{display:'flex',justifyContent:'space-between'}}>
        
        {st!=="recording"&&
        <button id="start" className={` f6 link center br3 ph3 pv2 mb2 dib white bg-black button-primary-${st==="recording" ? 'active' : 'inactive'}`} onClick={()=>{toggle("recording")}}>
        <AiFillPlaySquare size="40"/>
        </button>}
        {st==="recording"&&
        <button id="pause" className={` f6 link center br3 ph3 pv2 mb2 dib white bg-black button-primary-${st==="recording" ? 'active' : 'inactive'}`} onClick={()=>{toggle("paused")}}>
         <AiFillPauseCircle size="40"/> 
        </button>}
        
        <button id="stop" className=" f6 link center br3 ph3 pv2 mb2 dib white bg-black"  onClick={()=>{toggle("inactive");
        reset();
    }}>
        <FaStopCircle size="40"/>
        </button>
      </div>
    </div>
  );
};

export default Timer;