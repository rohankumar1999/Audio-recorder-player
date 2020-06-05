import React, { useState, useEffect } from 'react';
import './audio.css';
import {RecordVoiceOver,Stop,DeleteForever,MicNone} from '@material-ui/icons';
import AudioRecorder from './Record';
function renderingRecordingStatus(recordings, maxRecordings) {
  return <div
    // className="pv2 center black " 
    style={{ paddingTop: '0.5em', fontSize: '2em', display: 'flex', justifyContent: 'center', fontWeight: '500', color: '#039073' }}>

    {recordings.length}/{maxRecordings} Cough Recordings

  </div>;
}
const Timer = props => {
  const maxRecordings = props && props.question && props.question.response_length ? props.question.response_length : 3;
  const [timerValue, setTimerValue] = useState(5);
  const [recordStatus, setRecordStatus] = useState('');
  const [recordings, setRecordings] = useState([]);

  const toggle = status => {
    setRecordStatus(status);
  };

  const reset = () => {
    setTimerValue(5);
    
  };

  useEffect(() => {
    let interval = null;
    if (timerValue === 0) {
      setTimerValue(0)

      toggle('inactive');
      reset();
    }
    if (recordStatus === 'recording') {
      interval = setInterval(() => {
        setTimerValue(timerValue => timerValue - 1);
      }, 1050);
    } else if (recordStatus === 'paused' && timerValue !== 5) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [recordStatus, timerValue]);

  const addRecordings = f => {
    const recordings_list = [];
    recordings.forEach(fi => {
      recordings_list.push(fi);
    });
    recordings_list.push(f);
    setRecordings(recordings_list);
  };

  const triggerDelete = (f, index) => {
    
    if (window.confirm('Are you sure that you want to delete?')) {
      
      let it;
      const newRecordings = [];
      for (it = 0; it < recordings.length; it++) {
        if (recordings[it] !== f) {
          newRecordings.push(recordings[it]);
        }
      }
      setRecordings([...newRecordings]);
    }
  };

  const submitAudio = () => {
    recordings.forEach(f => {
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
    <div >
      {renderingRecordingStatus(recordings, maxRecordings)}


      <div 
      // className="pv2 center black " 
      style={{ paddingTop:'0.5em',paddingBottom:'0.5em', fontSize: '3em', display: 'flex', justifyContent: 'center',color:'#ff073a' }}>

        {timerValue}s

      </div>

      <div
      //  className="pv2 center black" 
      style={{ fontSize: '1em', display: 'flex', justifyContent: 'center' ,color:'#039073'}}>

      <  RecordVoiceOver style={{fontSize:'80px'}} />

      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <AudioRecorder status={recordStatus} onAddRecordings={addRecordings} width="400%"/>
      </div>
      
      
      

      <div style={{paddingTop:'1em', paddingBottom:'1em', display: 'flex', justifyContent: 'center',alignItems: 'center' }}>

        {recordStatus !== 'recording'
          && (
            <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>

            <button id="start"
              style={{height:'5em', width:'5em' ,color:'white' ,borderRadius:50 , background: "white",borderColor:'#039073',borderWidth:'0px', boxShadow : '0em 0em 1em #888888' }}
              // className={` f6 center br3 ph3 pv2 mb2 `}
              onClick={() => {
                if (recordings && recordings.length >= maxRecordings) {
                  alert(`You can not add more than ${maxRecordings} recordings.`);
                  return;
                }
                toggle('recording');
              }}>
              <MicNone fontSize="large"  style={{color:"#039073",fontSize:'3.5em'}} />
            </button>
            
          <p style={{color:'#039073',fontWeight:'bold',fontFamily:'Verdana'}}>
            Tap to start
          </p>
            </div>
          )}
        {/* {st === 'recording'
          && (
            <button id="pause"
              style={{borderRadius:'10px', background: "#B6B6B4", width: "5em", boxShadow: '0em 0.125em 0.25em #0000001A' }}
              // className={` f6 center br3 ph3 pv2 mb2 grow`} 
              onClick={() => { toggle('paused'); }}>
              <PauseCircleFilledIcon fontSize="large" color="black" />
            </button>
          )} */}
        {(recordStatus==='paused'||recordStatus==='recording')
        &&
        <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
        <button
          id="stop"
          style={{height:'5em', width:'5em' ,color:'white' ,borderRadius:50 , background: "#ff073a",borderColor:'#039073',borderWidth:'0px', boxShadow : '0em 0em 1em #888888' }}
          // className=" f6 center br3 ph3 pv2 mb2 "
          onClick={() => {
            toggle('inactive');
            reset();
          }}
        >
          <Stop style={{fontSize:'3.5em'}} color="black" />
        </button>
        <p style={{color:'#ff073a',fontWeight:'bold',fontFamily:'Verdana'}}>
        Tap to Submit
      </p>
      </div>
        }

      </div>

      
        <div  style={{
        paddingBottom:'1em',  display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column'
        }}>
          {recordings.map((f, index) => (
            <div
              style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: '1em'
              }}
              className={`file${index}`}
              key={f.toString()}>
              <audio controls autoPlay style={{width:'250px'}} name="media">
                <source src={f} className="bg-red" type="audio/wav" />
              </audio>
              
              <button
                style={{height:'2.5em', width:'2.5em' ,color:'white' ,borderRadius:50 , background: "#039073",borderColor:'#039073',borderWidth:'0px', boxShadow : '0em 0em 0.5em #888888' }}
                onClick={() => {
                  //   alert('removing');
                  //   delete files[index]
                  triggerDelete(f, index)
                }}>
              
                < DeleteForever style={{fontSize:'20px'}} />

              </button>

            </div>
          ))}
        </div>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {recordings.length > 0 
        ? <button className="submitButton"   onClick={submitAudio} type="button" >
              Upload
          </button> 
        : null}
      </div>

    </div>
  );
};

export default Timer;


