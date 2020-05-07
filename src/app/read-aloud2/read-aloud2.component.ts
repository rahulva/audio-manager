import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { TimerComponent } from '../timer/timer.component';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { AudioService } from '../services/audio.service';


@Component({
  selector: 'app-read-aloud2',
  templateUrl: './read-aloud2.component.html',
  styleUrls: ['./read-aloud2.component.scss']
})
export class ReadAloud2Component implements OnInit, AfterViewInit {

  gData: any;
  currentQ: any;
  currentQNo: number = 1;
  totalQs: number = 0;
  qNumbers;
  message;

  readingTimeSeconds = 10;
  recordingTimeSeconds = 10;

  progressValue: number = 0;
  @ViewChild('stopButton')
  stopButton: ElementRef<HTMLButtonElement>;
  @ViewChild(TimerComponent)
  timerComponent: TimerComponent;

  // timeLeft: number;
  // progressValue: number = 30;
  audioUrl: SafeUrl;

  private audioService: AudioService;

  constructor(private httpCleint: HttpClient, private sani: DomSanitizer) { }

  ngOnInit(): void {
    console.log('On load');
    this.httpCleint.get(`../../assets/ra-questions.xlsx`, {
      headers: new HttpHeaders(),
      responseType: 'arraybuffer'
    }
    ).subscribe(response => this.loadExcel(response, "application/ms-excel"));

  }

  ngAfterViewInit(): void {
    this.initiateTImer();
  }

  initiateTImer() {
    this.message = 'Time to read';
    this.timerComponent.startTimer(this.readingTimeSeconds, () => {
      this.message = 'Recoding';
      this.startRecording(this.recordingTimeSeconds);
    });

  }

  sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

  loadExcel(data: any, type: string) {
    console.log('Data :' + data);
    let blob = new Blob([data], { type: type });
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.gData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log('On load data  : \n ' + this.gData);

      this.currentQNo = 1;
      this.totalQs = this.gData.length;
      this.qNumbers = Array(this.totalQs).fill(null).map((x, i) => i + 1);
      this.setCurrentQ(this.currentQNo);
    }
    reader.readAsBinaryString(blob);
  }

  previous() {
    this.currentQNo--;
    this.setCurrentQ(this.currentQNo);
  }

  next() {
    this.currentQNo++;
    this.setCurrentQ(this.currentQNo);
  }

  setCurrentQ(qNo) {
    console.log(`current Q no : ${qNo}`);
    this.currentQ = this.gData[qNo - 1][0];
    console.log(`current Q : ${this.currentQ}`);
    this.initiateTImer();
  }

  changeQuestion(value) {
    console.log(`value ${value}`);
    this.currentQNo = value;
    this.setCurrentQ(this.currentQNo);
  }

  async startRecording(timeLeft) {
    console.log("read-aloud startRecording");
    this.audioService = new AudioService();
    // this.timeLeft = 3;
    this.timerComponent.startTimer(timeLeft);
    await this.audioService.startRecording(timeLeft * 1000, () => {
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
