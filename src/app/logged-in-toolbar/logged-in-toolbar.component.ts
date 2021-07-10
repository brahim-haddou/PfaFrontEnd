import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {DatafiliereService} from '../datafiliere/datafiliere.service';
import { Filiere } from '../DBModels/filiere.model';

@Component({
  selector: 'app-logged-in-toolbar',
  templateUrl: './logged-in-toolbar.component.html',
  styleUrls: ['./logged-in-toolbar.component.css']
})
export class LoggedInToolbarComponent implements OnInit {

  listFIliere!: Filiere[];
  public show = true;

  constructor(private datafiliereService: DatafiliereService) { }

  ngOnInit(): void {
    // this.getAllFilieres();
  }

  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }

  // public getAllFilieres(){
  //   this.listFIliere = [] ;
  //   this.datafiliereService.getAllFilieres().subscribe(
  //       (response: Filiere[]) => {
  //         this.listFIliere = response;
  //       },
  //       (error: HttpErrorResponse) => {
  //         alert(error.message);
  //       }
  //     );
  // }

}
