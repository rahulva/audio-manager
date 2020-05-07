import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadAloudComponent } from './read-aloud/read-aloud.component';
import { ExcelReaderComponent } from './excel-reader/excel-reader.component';
import { ReadAloud2Component } from './read-aloud2/read-aloud2.component';

const routes: Routes = [
  { path: 'read-aloud', component: ReadAloudComponent },
  { path: 'read-aloud2', component: ReadAloud2Component },
  { path: 'excel-reader', component: ExcelReaderComponent }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
