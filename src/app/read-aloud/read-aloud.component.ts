import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AudioService } from '../services/audio.service';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-read-aloud',
  templateUrl: './read-aloud.component.html',
  styleUrls: ['./read-aloud.component.scss']
})
export class ReadAloudComponent implements OnInit {

  constructor(private sani: DomSanitizer) { }

  ngOnInit(): void {
  }

  progressValue: number = 0;
  @ViewChild('stopButton')
  stopButton: ElementRef<HTMLButtonElement>;
  @ViewChild(TimerComponent)
  timerComponent: TimerComponent;

  timeLeft: number;
  // progressValue: number = 30;
  audioUrl: SafeUrl;

  private audioService: AudioService;

  increment() {
    this.progressValue += 10;
  }

  decrease() {
    this.progressValue -= 10;
  }

  async startRecording() {
    console.log("read-aloud startRecording");
    this.audioService = new AudioService();
    this.timeLeft = 3;
    this.timerComponent.startTimer(this.timeLeft);
    await this.audioService.startRecording(this.timeLeft * 1000, () => {
      console.log("read-aloud startRecording - callbck - setSafeAudioUrl");
      // this.setSafeAudioUrl();
      let el: HTMLButtonElement = this.stopButton.nativeElement;
      el.click();
    });
  }

  stopRecording() {
    console.log("read-aloud stopRecording - start");
    this.audioService.stopRecording();
    console.log("read-aloud stopRecording - setSafeAudioUrl");
    this.setSafeAudioUrl();
    console.log("read-aloud stopRecording - end");
  }

  playRecording() {
    console.log("read-aloud playRecording");
    this.audioService.playRecording();
  }

  resetRecorder() {
    console.log("read-aloud resetRecorder");
  }

  setSafeAudioUrl() {
    console.log("read-aloud setSafeAudioUrl - start");
    this.audioUrl = this.sani.bypassSecurityTrustUrl(this.audioService.getAudioUrlGlobal());
    console.log("read-aloud audioUrl - start" + this.audioUrl);
  }

}

