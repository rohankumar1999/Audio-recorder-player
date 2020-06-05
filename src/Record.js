import React, { useState } from 'react';
import AudioAnalyser from 'react-audio-analyser';
const AudioRecorder = props => {
    const [audioType, setAudioType] = useState('audio/wav');
    // const [audioSrc, setAudioSrc] = useState('');
    return (
        <div className="record">
            <AudioAnalyser
                backgroundColor={'#fff'}
                size={'10%'}
                // width={'100%'}
                width={200}
                strokeColor={'#039073'}
                status={props.status}
                audioType={audioType}
                timeslice={1000}
                // audioSrc={audioSrc}
                className="center"
                startCallback={e => {
                    console.log('succ start', e);
                }}

                pauseCallback={e => {
                    console.log('succ pause', e);
                }}
                stopCallback={e => {
                   

                    { props.onAddRecordings(window.URL.createObjectURL(e)); }
                }}
                onRecordCallback={e => {
                    console.log('recording', e);
                }}
                errorCallback={err => {
                    console.log('error', err);
                }}
            />
        </div >
    );
};

export default AudioRecorder;
