import { Component, OnInit } from '@angular/core';
import { DatafiliereService } from '../datafiliere/datafiliere.service';
import { Filiere } from '../DBModels/filiere.model';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-startform',
  templateUrl: './startform.component.html',
  styleUrls: ['./startform.component.css']
})
export class StartformComponent implements OnInit {

  listFiliere: Filiere[];
  choixFiliere!: Filiere;

  constructor(private datafiliereService: DatafiliereService) {
    this.listFiliere = [];
    this.getAllFilieres();
   }

  ngOnInit(): void {
    this.getAllFilieres();
  }

  public getAllFilieres(){
    this.listFiliere = [];
    this.datafiliereService.getAllFilieres().subscribe(
        (response: Filiere[]) => {
          this.listFiliere = response;
          this.choixFiliere = this.listFiliere[0];
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

}
