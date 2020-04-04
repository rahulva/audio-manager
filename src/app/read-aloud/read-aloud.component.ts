import { Component, OnInit } from '@angular/core';
import { AudioServiceService } from 'src/app/audio-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-read-aloud',
  templateUrl: './read-aloud.component.html',
  styleUrls: ['./read-aloud.component.scss']
})
export class ReadAloudComponent implements OnInit {

  public timeLeft: number;
  public progressValue: number = 0;
  private audioService: AudioServiceService;

  // enableRecord: boolean = true;
  // enableStop: boolean = false;
  // enablePlay: boolean = false;

  audioUrl: SafeUrl;

  constructor(private sani: DomSanitizer) { }

  ngOnInit(): void {
  }

  async startRecording() {
    // this.enableRecord = false;
    // this.enableStop = true;
    // this.enablePlay = false;

    this.audioService = new AudioServiceService();
    console.log('Test');
    this.timeLeft = 3000;
    await this.audioService.startRecording(this.timeLeft, () => {

      //  this.enablePlay = true; 
      this.audioUrl = this.getAudioUrl();
      console.log('Callback called');
    }).then(() => {
      console.log('Record completed');
      this.audioUrl = this.getAudioUrl();
    });
    // let value = this.timeLeft;
    // while (this.progressValue < this.timeLeft) {
    //   // 
    //   // setInterval(()=>{
    //   //   console.log('Test');
    //   //   this.progressValue++;}, 1);
    //   this.progressValue++;
    //   this.audioService.sleep(1);
    //   // setTimeout(() => { }, 1);
    // }
    // val.then(() => this.enablePlay = true)
  }

  stopRecording() {
    // this.audioService.stopRecording();
    // this.enablePlay = true;
    this.audioUrl = this.getAudioUrl();

    // this.enableRecord = false;
    // this.enableStop = false;
    // this.enablePlay = true;
  }

  playRecording() {
    this.audioService.playRecording();
  }

  resetRecorder() {
    // this.enableRecord = true;
    // this.enableStop = false;
    // this.enablePlay = false;
  }

  getAudioUrl() {
    return this.sani.bypassSecurityTrustUrl(this.audioService.getAudioUrlGlobal());;
  }

}
