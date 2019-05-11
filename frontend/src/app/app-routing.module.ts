import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Search2Component } from './search2/search2.component';
import { ContentComponent } from './content/content.component';

const routes: Routes = [
  {path:'',redirectTo:'/search', pathMatch:'full'},
  {path:'search',component:Search2Component},
  {path:'content',component:ContentComponent},
  { path: '**', component: Search2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
