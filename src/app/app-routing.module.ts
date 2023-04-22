import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WireframeComponent } from './screens/wireframe/wireframe.component';


const routes: Routes = [
  { path: '', component: WireframeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
