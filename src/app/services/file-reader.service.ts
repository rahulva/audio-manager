import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  constructor(private httpCleint: HttpClient) { }
  private gData;

  async getData(): Promise<any> {
    new Promise<any>(() => {
      this.httpCleint.get(`../../assets/ra-questions.xlsx`, {
        headers: new HttpHeaders(),
        responseType: 'arraybuffer'
      }
      ).subscribe(
        response => { 
          console.log('File loaded');
          this.loadExcel(response, "application/ms-excel"); 
          console.log('loadExcel done');}
      );
    });

    ;
  }

 async loadExcel(data: any, type: string) {
    console.log('Data :' + data);
    let blob = new Blob([data], { type: type });
    const reader = new FileReader();
    reader.onload = (e: any) => {
      console.log('onload started');
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.gData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log('On load data  : \n ' + this.gData);

    }
    reader.readAsBinaryString(blob);
  }
}
