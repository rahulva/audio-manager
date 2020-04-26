import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadAloudComponent } from './read-aloud/read-aloud.component';


const routes: Routes = [{ path: 'read-aloud', component: ReadAloudComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
