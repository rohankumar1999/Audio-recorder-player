import React, { useState } from 'react';
import './audio.css';
import AudioAnalyser from 'react-audio-analyser';
import 'tachyons';

const Demo = props => {
    const [audioType, setAudioType] = useState('audio/wav');
    const [audioSrc, setAudioSrc] = useState('');
    return (
        <div className="record">
            <AudioAnalyser
                backgroundColor={'#fff'}
                size={'10%'}
                // width={'100%'}
                width={200}
                strokeColor={'#000000'}
                status={props.status}
                audioType={audioType}
                timeslice={1000}
                audioSrc={audioSrc}
                className="center"
                startCallback={e => {
                    console.log('succ start', e);
                }}

                pauseCallback={e => {
                    console.log('succ pause', e);
                }}
                stopCallback={e => {
                    // console.log("succ stop", e)
                    // window.URL.createObjectURL(e);
                    // console.log('url is: ',window.URL.createObjectURL(e))

                    // console.log('base64 encoded: ',window.btoa(window.URL.createObjectURL(e)))

                    { props.onCallFiles(window.URL.createObjectURL(e)); }
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

export default Demo;
