// declare function MediaRecorder(stream: MediaStream): void;

// interface RecorderOperation {
//   start(): void;
//   stop(): Promise<AudioPlayer>;
// }

// interface AudioPlayer {
//   audioBlob: Blob;
//   audioUrl: string;
//   play(): Promise<void>;
// }


// export class AudioRecorder {
//   private globalRecorder: RecorderOperation;
//   private audioChunks = [];
//   recordAudio = () =>
//     new Promise<RecorderOperation>(async resolve => {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream);

//       mediaRecorder.addEventListener("dataavailable", event => {
//         this.audioChunks.push(event.data);
//       });

//       const start = () => mediaRecorder.start();

//       const stop = () =>
//         new Promise<AudioPlayer>(resolve => {

//           const playAudio = () => {
//             const audioBlob = new Blob(this.audioChunks);
//             const audioUrl = URL.createObjectURL(audioBlob);
//             const audio = new Audio(audioUrl);
//             const play = () => audio.play();
//             resolve({ audioBlob, audioUrl, play });
//           };

//           mediaRecorder.addEventListener("stop", playAudio);
//           mediaRecorder.stop();
//         });

//       resolve({ start, stop });
//     });

//   sleep = time => new Promise(resolve => setTimeout(resolve, time));

//   // handleAction = async () => {
//   //   const recorder: RecorderOperation = await this.recordAudio();
//   //   const actionButton = <HTMLButtonElement>document.getElementById('action');
//   //   actionButton.disabled = true;
//   //   recorder.start();
//   //   await this.sleep(3000);
//   //   const audio: AudioPlayer = await recorder.stop();
//   //   audio.play();
//   //   await this.sleep(3000);
//   //   actionButton.disabled = false;
//   // }

//   async startRecording(recordFor: number) {
//     console.log('Reccording Started');
//     this.globalRecorder = await this.recordAudio();
//     this.globalRecorder.start();
//     await this.sleep(recordFor);
//     this.stopRecording();
//     console.log('Reccording Ended');
//   }

//   async stopRecording() {
//     console.log('Reccording Stopping');
//     const audio: AudioPlayer = await this.globalRecorder.stop();
//     console.log('Reccording Stopping - DONE');
//   }

//   playRecording() {
//     console.log('Reccording Playing');
//     const audioBlob = new Blob(this.audioChunks);
//     const audioUrl = URL.createObjectURL(audioBlob);
//     const audio = new Audio(audioUrl);
//     audio.play();
//     // await this.sleep(3000);
//     console.log('Reccording Playing - DONE');
//   }
// }