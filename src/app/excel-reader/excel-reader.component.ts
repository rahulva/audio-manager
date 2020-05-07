import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-excel-reader',
  templateUrl: './excel-reader.component.html',
  styleUrls: ['./excel-reader.component.scss']
})
export class ExcelReaderComponent implements OnInit {

  gData: any;
  currentQ: any;
  currentQNo: number = 1;
  totalQs: number = 0;
  qNumbers;

  constructor(private httpCleint: HttpClient) { }

  ngOnInit(): void {
    console.log('On load');
    this.httpCleint.get(`../../assets/ra-questions.xlsx`, {
      headers: new HttpHeaders(),
      responseType: 'arraybuffer'
    }
    ).subscribe(response => this.loadExcel(response, "application/ms-excel"));
  }

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
  }

  changeQuestion(value) {
    console.log(`value ${value}`);
    this.currentQNo = value;
    this.setCurrentQ(this.currentQNo);
  }

}