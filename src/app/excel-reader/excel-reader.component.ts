import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
// import * as fs from 'fs';

// import { read, write, utils, WorkBook, WorkSheet } from 'xlsx';

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

  constructor(private httpCleint: HttpClient) { }

  ngOnInit(): void {
    console.log('On load');
    // const target: DataTransfer = <DataTransfer>(evt.target);
    // if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    // const reader: FileReader = new FileReader();
    // reader.onload = (e: any) => {
    /* read workbook */
    // const bstr: string = e.target.result;
    let blo: BlobPart[];



    // const f:File = new File(blo, 'ra-questions.xlsx');
    // const reader: FileReader = new FileReader();
    // reader.readAsArrayBuffer(f);
    // reader.onload(e)
    // reader.readFileSync(blo, {type:'buffer'}
    // , { type: 'file' }
    // let buffer: Buffer = fs.readFileSync('ra-questions.xlsx');
    // const wb: XLSX.WorkBook = XLSX.readFile('ra-questions.xlsx', { type: 'buffer' });

    /* grab first sheet */
    // const wsname: string = wb.SheetNames[0];
    // const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    // this.data = XLSX.utils.sheet_to_json<AOA>(ws, { header: 1 });
    // console.log('On load data  : \n ' + this.data);
    // };
    // reader.readAsBinaryString(target.files[0]);

    // const wb: XLSX.WorkBook = XLSX.read('ra-questions.xlsx');
    // const ws: XLSX.WorkSheet = wb.Sheets['Sheet1'];
    // ws[''];

    // this.httpCleint.get(`../../assets/ra-questions.xlsx`, {
    //   headers: new HttpHeaders(),
    //   responseType: 'arraybuffer'
    // }
    // ).subscribe(response => downLoadFile(response, "application/ms-excel"));

    this.httpCleint.get(`../../assets/ra-questions.xlsx`, {
      headers: new HttpHeaders(),
      responseType: 'arraybuffer'
    }
    ).subscribe(response => this.loadExcel(response, "application/ms-excel"));
  }

  /**
 * Method is use to download file.
 * @param data - Array Buffer data
 * @param type - type of the document.
 */
  downLoadFile(data: any, type: string) {
    console.log('Data :' + data);
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }

  loadExcel(data: any, type: string) {
    console.log('Data :' + data);
    let blob = new Blob([data], { type: type });
    // console.log('Blob :' + blob);
    // 'base64' | 'binary' | 'buffer' | 'file' | 'array' | 'string';
    // const wb: XLSX.WorkBook = XLSX.read(blob, { type: 'array' });
    const reader = new FileReader();
    reader.onload = (e: any) => {
      /* wire up file reader */

      // let url = window.URL.createObjectURL(blob);
      const bstr: string = e.target.result;
      // console.log('URL :' + bstr);
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      console.log('WorkBook Ready' + wb);
      // for (let key in wb) {
      //   if (wb.hasOwnProperty(key)) {
      //     console.log(`${key} : ${wb[key]}`)
      //   }
      // }

      // console.log('WorkSheet names : ' + wb.SheetNames);

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      console.log('WS name : ' + wsname);
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      console.log('WS  : ' + ws);
      // console.log('WS rows : ' + ws["!cols"]);
      // console.log('WS rows : ' + ws["!rows"]);
      // for (let key in ws) {
      //   if (ws.hasOwnProperty(key)) {
      //     console.log(`ws ${key} : ${ws[key]}`)
      //   }
      // }

      let refVal = ws['!ref'];
      console.log(`ws ref value ${refVal}`)

      let a1Val = ws['A1'];
      console.log(`ws A1  value ${a1Val}`)

      for (let key in a1Val) {
        if (a1Val.hasOwnProperty(key)) {
          console.log(`ws A1  value ${key} : ${a1Val[key]}`)
        }
      }

      let b1Val = ws['B1'];
      console.log(`ws B1  value ${a1Val}`)

      for (let key in b1Val) {
        if (b1Val.hasOwnProperty(key)) {
          console.log(`ws B1  value ${key} : ${b1Val[key]}`)
        }
      }
      /* save data */
      // this.data = <AOA[]>(XLSX.utils.sheet_to_json<AOA>(ws));
      console.log('Sheet to ');
      // let a = XLSX.utils.sheet_to_json(ws, { header: 1 });
      // console.log(a);
      // this.gData = a;
      this.gData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log('On load data  : \n ' + this.gData);

      this.currentQNo = 1;
      this.totalQs = this.gData.length;
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
    this.currentQ = this.gData[qNo - 1][1];
    console.log(`current 0  : no ${this.currentQ[0]} 1 ${this.currentQ[1]}`);
  }

}

// export class AOA {
//   no: number;
//   question: string;
// }
