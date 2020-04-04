import { Injectable } from '@angular/core';


// @Injectable({
//   providedIn: 'root'
// })
export class AudioServiceService {

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
        console.log('mediaRecorder.state ' + mediaRecorder.state);
      };

      const stop = () => new Promise<AudioPlayer>(resolve => {
        console.log('AudioServiceService.recordAudio.stop start');
        console.log('mediaRecorder.state ' + mediaRecorder.state);
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

        console.log('mediaRecorder.state ' + mediaRecorder.state);
        console.log('AudioServiceService.recordAudio.stop end');
      });

      resolve({ start, stop });
    });

  sleep = time => new Promise(resolve => setTimeout(resolve, time));

  // handleAction = async () => {
  //   const recorder: RecorderOperation = await this.recordAudio();
  //   const actionButton = <HTMLButtonElement>document.getElementById('action');
  //   actionButton.disabled = true;
  //   recorder.start();
  //   await this.sleep(3000);
  //   const audio: AudioPlayer = await recorder.stop();
  //   audio.play();
  //   await this.sleep(3000);
  //   actionButton.disabled = false;
  // }

  async startRecording(recordFor: number, callback?: any) {
    console.log('AudioServiceService.startRecording Start');
    this.globalRecorder = await this.recordAudio();
    this.globalRecorder.start();
    await this.sleep(recordFor);
    await this.globalRecorder.stop();
    console.log('AudioServiceService.startRecording End');
    callback();
  }

  async stopRecording() {
    console.log('AudioServiceService.stopRecording Start');
    // const audio: AudioPlayer = 
    await this.globalRecorder.stop();
    console.log('AudioServiceService.stopRecording End');
  }

  playRecording() {
    console.log('AudioServiceService.playRecording Start');
    const audioBlob = new Blob(this.audioChunks);
    const audioUrl = URL.createObjectURL(audioBlob);
    console.log("Audio URL : ", audioUrl);
    const audio = new Audio(audioUrl);
    audio.play();
    // await this.sleep(3000);
    console.log('AudioServiceService.playRecording End');
  }

  getAudioUrlGlobal() {
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