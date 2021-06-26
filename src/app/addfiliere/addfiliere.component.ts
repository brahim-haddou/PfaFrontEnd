import { Component, OnInit } from '@angular/core';
import { Filiere } from '../DBModels/filiere.model';
import {HttpErrorResponse} from '@angular/common/http';
import {DatafiliereService} from '../datafiliere/datafiliere.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addfiliere',
  templateUrl: './addfiliere.component.html',
  styleUrls: ['./addfiliere.component.css']
})
export class AddfiliereComponent implements OnInit {

  nom!: string;
  filiere!: Filiere;

  constructor(private datafiliereService: DatafiliereService, private dialogRef: MatDialogRef<AddfiliereComponent>) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.filiere = {nom: this.nom};
    this.createFiliere(this.filiere);
    this.dialogRef.close();
  }

  createFiliere(filiere: Filiere): void{
    this.datafiliereService.createFiliere(filiere).subscribe(
      (request: Filiere) => {
        filiere = request;
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
