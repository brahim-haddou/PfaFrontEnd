import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DatapageComponent } from './datapage/datapage.component'; 
import { DataprofComponent } from './dataprof/dataprof.component'; 
import { DatamoduleComponent } from './datamodule/datamodule.component';
import { BuildpageComponent } from './buildpage/buildpage.component';
import { DatafiliereComponent } from './datafiliere/datafiliere.component';

const routes: Routes = [
  { path : '' , redirectTo: 'home' , pathMatch: 'full'},
  { path : 'home' , component :HomepageComponent},
  { path : 'build' , component :BuildpageComponent},
  { path : 'data' , component :DatapageComponent, children: [
    { path : '' , redirectTo: 'prof', pathMatch: 'full'},
    { path : 'filiere' , component :DatafiliereComponent},
    { path : 'prof' , component :DataprofComponent},
    { path : 'filiere/module/:id', component:DatamoduleComponent }
  ]},
  { path : "**" , component :PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
