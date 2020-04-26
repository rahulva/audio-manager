//import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export class AudioService {

  constructor() { }

  private globalRecorder: RecorderOperation;
  private audioChunks = [];
  private audioUrlGlobal: string;

  recordAudio = () =>
    new Promise<RecorderOperation>(async resolve => {
      const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.addEventListener("dataavailable", event => {
        this.audioChunks.push(event.data);
      });

      const start = () => {
        mediaRecorder.start();
        console.log('audioService.recordAudio.start mediaRecorder.state ' + mediaRecorder.state);
      };

      const stop = () => new Promise<AudioPlayer>(resolve => {
        console.log('audioService.recordAudio.stop start');
        console.log('audioService.recordAudio.stop mediaRecorder.state ' + mediaRecorder.state);
        //   const playAudio = () => {
        //     const audioBlob = new Blob(this.audioChunks);
        //     const audioUrl = URL.createObjectURL(audioBlob);
        //     this.audioUrlGlobal = audioUrl;
        //     const audio = new Audio(audioUrl);
        //     const play = () => audio.play();
        //     resolve({ audioBlob, audioUrl, play });
        //   };

        //   mediaRecorder.addEventListener("stop", playAudio);
        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }

        console.log('audioService.recordAudio.stop mediaRecorder.state ' + mediaRecorder.state);
        console.log('audioService.recordAudio.stop end');
      });

      resolve({ start, stop });
    });

  sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

  async startRecording(recordFor: number, callback) {
    console.log('audioService.startRecording start');
    this.globalRecorder = await this.recordAudio();
    console.log('audioService.startRecording globalRecorder.start()');
    this.globalRecorder.start();
    console.log('audioService.startRecording await this.sleep');
    await this.sleep(recordFor);
    console.log('audioService.startRecording await this.globalRecorder.stop');
    this.globalRecorder.stop();
    console.log('audioService.startRecording await callback');
    callback();
    console.log('audioService.startRecording End');
  }

  async stopRecording() {
    console.log('audioService.stopRecording Start');
    console.log('audioService.stopRecording  await this.globalRecorder.stop');
    await this.globalRecorder.stop();
    console.log('audioService.stopRecording End');
  }

  playRecording() {
    console.log('audioService.playRecording Start');
    const audioBlob = new Blob(this.audioChunks);
    const audioUrl = URL.createObjectURL(audioBlob);
    console.log("Audio URL : " + audioUrl);
    const audio = new Audio(audioUrl);
    audio.play();
    console.log('audioService.playRecording End');
  }

  getAudioUrlGlobal() {
    console.log('audioService.getAudioUrlGlobal Start');
    const audioBlob = new Blob(this.audioChunks);
    return URL.createObjectURL(audioBlob);
  }
}

/**
 * 
 * @param stream Declaration
 */
declare function MediaRecorder(stream: MediaStream): void;

interface RecorderOperation {
  start(): void;
  stop(): Promise<AudioPlayer>;
}

interface AudioPlayer {
  audioBlob: Blob;
  audioUrl: string;
  play(): Promise<void>;
}