import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  ticks: number = 0;
  hoursDisplay: number = 0;
  minutesDisplay: number = 0;
  secondsDisplay: number = 0;
  totalTime: number;

  constructor() { }

  ngOnInit(): void {
    // this.startTime();
    // this.startTimer(40);
  }

  startTime() {
    let timerOutput: Observable<number> = timer(0, 1000);
    let sub: Subscription = timerOutput.subscribe(t => {
      this.ticks = t;
      this.totalTime = t;
      console.log('Ticks : ' + this.ticks);
      this.secondsDisplay = this.getSecconds(this.ticks);
      this.minutesDisplay = this.getMinutes(this.ticks);
      this.hoursDisplay = this.getHours(this.ticks);
    });
  }

  public startTimer(runTills: number = 40, callback?) {
    this.totalTime = runTills
    this.ticks = runTills;
    let timerOutput: Observable<number> = timer(0, 1000);
    let sub: Subscription = timerOutput.subscribe(t => {
      this.ticks = runTills - t;
      // console.log('Ticks : ' + this.ticks);
      if (this.ticks == 0) {
        sub.unsubscribe();
        if(callback) { 
          console.log('Calling callback')
          callback();
        }
      }
      this.secondsDisplay = this.getSecconds(this.ticks);
      this.minutesDisplay = this.getMinutes(this.ticks);
      this.hoursDisplay = this.getHours(this.ticks);
    });

  }

  remainingTimePercent() {
    let remainingTime = (this.totalTime - this.ticks)
    return ((this.ticks / this.totalTime) * 100);
  }

  private setInitValue(runTills: number = 40) {
    this.secondsDisplay = this.getSecconds(runTills);
    this.minutesDisplay = this.getMinutes(runTills);
    this.hoursDisplay = this.getHours(runTills);
  }

  private getSecconds(ticks: number) {
    return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {
    return this.pad(Math.floor(ticks / 60) % 60);
  }

  private getHours(ticks: number) {
    return this.pad(Math.floor((ticks / 60) / 60));
  }

  private pad(digit: any) {
    let val = digit;
    if (digit <= 9) {
      val = '0' + digit;
    }
    return val;
  }
}
