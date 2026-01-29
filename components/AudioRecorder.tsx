
import React, { useState, useRef } from 'react';

interface AudioRecorderProps {
  onStop: (blob: Blob) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onStop }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioUrl(URL.createObjectURL(blob));
        onStop(blob);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (err) {
      alert("Permiso de micrófono denegado.");
    }
  };

  const stop = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    mediaRecorderRef.current?.stream.getTracks().forEach(t => t.stop());
  };

  return (
    <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-center">
      {!isRecording ? (
        <button 
          onClick={start}
          className="bg-[#4c9fa9] text-white px-6 py-3 rounded-full hover:opacity-90 transition-all flex items-center mx-auto"
        >
          <span className="mr-2">🎤</span> Grabar respuesta
        </button>
      ) : (
        <button 
          onClick={stop}
          className="bg-red-500 text-white px-6 py-3 rounded-full animate-pulse flex items-center mx-auto"
        >
          <span className="mr-2">⏹</span> Detener grabación
        </button>
      )}
      {audioUrl && (
        <div className="mt-4">
          <p className="text-xs text-slate-400 mb-2">Tu grabación:</p>
          <audio src={audioUrl} controls className="mx-auto h-8" />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
