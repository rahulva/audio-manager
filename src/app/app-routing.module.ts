import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadAloudComponent } from './read-aloud/read-aloud.component';
import { ExcelReaderComponent } from './excel-reader/excel-reader.component';

const routes: Routes = [
  { path: 'read-aloud', component: ReadAloudComponent },
  { path: 'excel-reader', component: ExcelReaderComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
