import React, { useState, useEffect } from 'react';
import { AiFillPlaySquare, AiFillPauseCircle, AiFillCloseCircle } from 'react-icons/ai';
import { FaStopCircle, FaMicrophoneAlt } from 'react-icons/fa';
import './audio.css';
// import AudioAnalyser from "react-audio-analyser";
import 'tachyons';
import Demo from './Record';

const Timer = props => {
  const maxRecordings = props && props.question && props.question.response_length ? props.question.response_length : 3;
  const [seconds, setSeconds] = useState(5);
  const [st, setSt] = useState('');
  const [files, setFiles] = useState([]);
  const toggle = st => {
    setSt(st);
  };

  const reset = () => {
    setSeconds(5);
    // setSt("incactive");
  };

  useEffect(() => {
    let interval = null;
    if (seconds === 0) {
      setSeconds(0)

      toggle('inactive');
      reset();
    }
    if (st === 'recording') {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1050);
    } else if (st === 'paused' && seconds !== 5) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [st, seconds]);

  const callFiles = f => {
    const list = [];
    files.forEach(fi => {
      list.push(fi);
    });
    list.push(f);
    setFiles(list);
  };

  const triggerDelete = (f, index) => {
    // alert('removing')
    // console.log(document.getElementById("app"))
    // document.getElementById(`file${index}`).style.display="none";
    // delete files[index]

    // setFiles(delete files[index])
    // console.log('attempting to delete: ',ind)
    if (window.confirm('Are you sure that you want to delete?')) {
      // var newList=[]
      // newList=files.forEach((fi,i)=>{
      //     if(i!==ind){
      //         return fi;
      //     }
      // })
      let it;
      const newList = [];
      for (it = 0; it < files.length; it++) {
        if (files[it] !== f) {
          newList.push(files[it]);
        }
      }
      setFiles([...newList]);
    }
  };

  const submitAudio = () => {
    files.forEach(f => {
      fetch(f)
        .then((res) => {
          res.blob().then(function (blob) {
            var reader = new FileReader();
            reader.addEventListener("loadend", function () {
              var base64FileData = reader.result.toString();
              var mediaFileObject = {
                fileUrl: f,
                size: blob.size,
                type: blob.type,
                src: base64FileData.slice(22)
              };
              console.log('audio file: ', mediaFileObject.src) //mediaFileObject.src is the actual encoded audio file
            });

            reader.readAsDataURL(blob);

          });
        });
    });
    window.alert('Your Audio/s have been submitted!!');
  };
  // const submitAudio = () => {
  //   console.log('submitAudio');
  //   props.onAnswerSelected();
  //   // files.forEach((f) => {
  //   //   console.log(window.btoa(f))
  //   // })
  //   // window.alert("Your Audio/s have been submitted!!")
  // };
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div className="ph3 pv2 mb2 dib w-50 center black " style={{ fontSize: '2em', display: 'flex', justifyContent: 'center' }}>
        {seconds}
        s
                  </div>

      <div className="ph3 pv2 mb2 dib w-50 center black" style={{ fontSize: '1em', display: 'flex', justifyContent: 'center' }}>
        <FaMicrophoneAlt size="80" />
      </div>
      
           <Demo status={st} onCallFiles={callFiles} width="400%"/>
      
      

      <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>

        {st !== 'recording'
          && (
            <button id="start"
              style={{ background: "#B6B6B4", width: "5em", boxShadow: '0em 0.125em 0.25em #0000001A' }}
              className={` f6 link center br3 ph3 pv2 mb2 dib light-blue bg-black button-primary-${st === 'recording' ? 'active' : 'inactive'}`}
              onClick={() => {
                if (files && files.length >= maxRecordings) {
                  alert(`You can not add more than ${maxRecordings} recordings.`);
                  return;
                }
                toggle('recording');
              }}>
              <AiFillPlaySquare size="30" color="black" />
            </button>
          )}
        {st === 'recording'
          && (
            <button id="pause"
              style={{ background: "#B6B6B4", width: "5em", boxShadow: '0em 0.125em 0.25em #0000001A' }}
              className={` f6 link center br3 ph3 pv2 mb2 dib light-blue bg-black button-primary-${st === 'recording' ? 'active' : 'inactive'}`} onClick={() => { toggle('paused'); }}>
              <AiFillPauseCircle size="30" color="black" />
            </button>
          )}
        {(st==='paused'||st==='recording')
        &&
        <button
          id="stop"
          style={{ background: '#B6B6B4', width: '5em', boxShadow: '0em 0.125em 0.25em #0000001A' }}
          className=" f6 link center br3 ph3 pv2 mb2 dib light-blue bg-black"
          onClick={() => {
            toggle('inactive');
            reset();
          }}
        >
          <FaStopCircle size="30" color="black" />
        </button>
        }

      </div>

      <div className="files pa3 row center" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column'
        }}>
          {files.map((f, index) => (
            <div
              style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: '1em'
              }}
              className={`file${index}`}
              key={f.toString()}>
              <audio controls autoPlay style={{width:'250px'}} name="media"><source src={f} className="bg-red" type="audio/wav" /></audio>
              <div style={{}} />
              <button
                className="w-2 center f6 link grow "
                style={{ height: '2rem', width: '2rem', borderRadius: '60%' ,background: '#B6B6B4' }}
                onClick={() => {
                  //   alert('removing');
                  //   delete files[index]
                  triggerDelete(f, index)
                }}
              >
                <AiFillCloseCircle size="15"/>

              </button>

            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {files.length > 0 ? <button className="submitButton" style={{ fontSize: '1em',background: '#B6B6B4',color:'black' ,fontFamily:'bold'}} onClick={submitAudio} type="button" >Submit</button> : null}
      </div>

    </div>
  );
};

export default Timer;
