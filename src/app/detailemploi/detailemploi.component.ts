import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Emploi } from '../DBModels/emploi.model';
import { Empreq } from '../DBModels/empreq.model';
import { Classe } from '../DBModels/classe.model';
import { Prof } from '../DBModels/prof.model';
import { Salle } from '../DBModels/salle.model';
import {HttpErrorResponse} from '@angular/common/http';
import {BuildpageService} from '../buildpage/buildpage.service';
import {DataprofService} from '../dataprof/dataprof.service';
import {DatasalleService} from '../datasalle/datasalle.service';
import {DataClasseService} from '../dataclasse/dataclasse.service';
import { MatDialogRef } from '@angular/material/dialog';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-detailemploi',
  templateUrl: './detailemploi.component.html',
  styleUrls: ['./detailemploi.component.css']
})
export class DetailemploiComponent implements OnInit {

  emploi!: Emploi;
  profList!: Prof[];
  salleList!: Salle[];
  classeList!: Classe[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {emploi: Emploi, req: boolean},private buildpageService: BuildpageService ,private dataprofService: DataprofService ,private datasalleService: DatasalleService ,private dataClasseService: DataClasseService , private dialogRef: MatDialogRef<DetailemploiComponent>) { }

  ngOnInit(): void {
    this.emploi = this.data.emploi;
    this.getAllProfesseurs();
    this.getAllSalles();
    this.getAllClasses();
  }

  submit(): void {
    var emp : Empreq;
    emp = {id: this.emploi.id, classeId: this.emploi.classe.id, professeurId: this.emploi.professeur.id, salleId: this.emploi.salle.id, creneauId: this.emploi.creneau.id};
    this.buildpageService.updateEmploiDuTemps(emp).subscribe(
      (request : Emploi) => {
        this.data.emploi = request;
        return String;
      }
    )
    //this.updateEmploi(this.data.emploi);
    this.dialogRef.close();
  }

  add(): void{
    var emp : Empreq;
    emp ={id: this.emploi.id, classeId: this.emploi.classe.id, professeurId: this.emploi.professeur.id, salleId: this.emploi.salle.id, creneauId: this.emploi.creneau.id};
    this.buildpageService.saveEmploiDuTemps(emp).subscribe(
        (request : Emploi) => {
          this.data.emploi = request;
          return String;
        }
    );
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  updateEmploi(emploi: Emploi): void{
    /*this.buildpageService.updateEmploiDuTemps(emploi).subscribe(
      (request : Emploi) => {
        this.data.emploi = request;
        return String;
      }
    )*/
    this.buildpageService.updateClasseEmploiDuTemps(emploi, this.emploi.classe).subscribe(
      (request: Emploi) => {
        emploi = request;
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    this.buildpageService.updateProfesseurEmploiDuTemps(emploi, this.emploi.professeur).subscribe(
      (request: Emploi) => {
        emploi = request;
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    this.buildpageService.updateSalleEmploiDuTemps(emploi, this.emploi.salle).subscribe(
      (request: Emploi) => {
        emploi = request;
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAllProfesseurs(){
    this.profList = [] ;
    this.dataprofService.getAllProfesseurs().subscribe(
        (response: Prof[]) => {
          this.profList = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public getAllSalles(){
    this.salleList = [] ;
    this.datasalleService.getAllSalles().subscribe(
        (response: Salle[]) => {
          this.salleList = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public getAllClasses(){
    this.classeList = [];
    this.dataClasseService.getAllClasses().subscribe(
        (response: Classe[]) => {
          this.classeList = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

}
