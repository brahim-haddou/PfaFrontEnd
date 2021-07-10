import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DatapageComponent } from './datapage/datapage.component';
import { DataprofComponent } from './dataprof/dataprof.component';
import { DatamoduleComponent } from './datamodule/datamodule.component';
import { BuildpageComponent } from './buildpage/buildpage.component';
import { DatafiliereComponent } from './datafiliere/datafiliere.component';
import { DataelementComponent } from './dataelement/dataelement.component';
import { DataclasseComponent } from './dataclasse/dataclasse.component';
import { DatasalleComponent } from './datasalle/datasalle.component';

const routes: Routes = [
  { path : '' , redirectTo: 'home' , pathMatch: 'full'},
  { path : 'home' , component :HomepageComponent},
  { path : 'build/:id' , component :BuildpageComponent},
  { path : 'data' , component :DatapageComponent, children: [
    { path : '' , redirectTo: 'filiere', pathMatch: 'full'},
    { path : 'filiere' , component :DatafiliereComponent},
    { path : 'prof' , component :DataprofComponent},
    { path : 'salle' , component :DatasalleComponent},
    { path : 'filiere/module/:id', component:DatamoduleComponent },
    { path : 'filiere/module/:id/element/:id', component:DataelementComponent },
    { path : 'filiere/module/:id/element/:id/classe/:id', component:DataclasseComponent }
  ]},
  { path : "**" , component :PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
