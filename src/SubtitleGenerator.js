import React, { useEffect, useState } from 'react';

function SubtitleGenerator() {
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    let recognition;

    // Check browser support for SpeechRecognition API
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = true; // Enable continuous speech recognition
      recognition.interimResults = true; // Enable interim results (partial recognition)

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        // Update the transcript state with the final transcription
        setTranscript(finalTranscript);
      };

      recognition.start();
    } else {
      console.error('Speech recognition not supported in this browser.');
    }

    // Cleanup: Stop recognition when component unmounts
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  return (
    <div>
      <h1>Automatic Subtitles</h1>
      <p>{transcript}</p>
    </div>
  );
}

export default SubtitleGenerator;