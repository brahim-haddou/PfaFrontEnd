import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Filiere } from '../DBModels/filiere.model';
import { Module } from '../DBModels/module.model';
import {HttpErrorResponse} from '@angular/common/http';
import {DatafiliereService} from '../datafiliere/datafiliere.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detailfiliere',
  templateUrl: './detailfiliere.component.html',
  styleUrls: ['./detailfiliere.component.css']
})
export class DetailfiliereComponent implements OnInit {

  filiere!: Filiere;
  moduleList!: Module[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {filiere: Filiere},private datafiliereService: DatafiliereService, private dialogRef: MatDialogRef<DetailfiliereComponent>) { }

  ngOnInit(): void {
    this.getModules(this.data.filiere)
  }

  submit(): void {
    this.filiere = {id: this.data.filiere.id ,nom: this.data.filiere.nom};
    this.updateFiliere(this.filiere);
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  updateFiliere(filiere: Filiere): void{
    this.datafiliereService.updateFiliere(filiere).subscribe(
      (request: Filiere) => {
        filiere = request;
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getModules(filiere: Filiere): void {
    this.moduleList= [];
    this.datafiliereService.getModules(this.data.filiere).subscribe(
      (response: Module[]) => {
        this.moduleList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
