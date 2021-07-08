import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Emploi } from '../DBModels/emploi.model';
import { Empreq } from '../DBModels/empreq.model';
import { Classe } from '../DBModels/classe.model';
import { Element } from '../DBModels/element.model';
import { Module } from '../DBModels/module.model';
import { Prof } from '../DBModels/prof.model';
import { Salle } from '../DBModels/salle.model';
import {HttpErrorResponse} from '@angular/common/http';
import {BuildpageService} from '../buildpage/buildpage.service';
import {DataprofService} from '../dataprof/dataprof.service';
import {DatasalleService} from '../datasalle/datasalle.service';
import {DataClasseService} from '../dataclasse/dataclasse.service';
import {DataModuleService} from '../datamodule/datamodule.service';
import {DataElementService} from '../dataelement/dataelement.service';
import {DatafiliereService} from '../datafiliere/datafiliere.service';
import { MatDialogRef } from '@angular/material/dialog';
import {AppRoutingModule} from '../app-routing.module';
import {BuildpageComponent} from '../buildpage/buildpage.component';

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
  elementList!: Element[];
  moduleList!: Module[];
  selectedModule!: number;
  selectedElement!: number;
  selectedClasse!: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {emploi: Emploi, req: boolean, dataId : number},
              private dataElementService: DataElementService,
              private datamoduleService: DataModuleService,
              private datafiliereService: DatafiliereService,
              private buildpageService: BuildpageService ,
              private dataprofService: DataprofService ,private datasalleService: DatasalleService ,private dataClasseService: DataClasseService , private dialogRef: MatDialogRef<DetailemploiComponent>) { }

  ngOnInit(): void {
    this.emploi = this.data.emploi;
    this.elementList = [];
    this.classeList = [];
    this.moduleList = [];
    this.profList = [];
    this.getFiliereModules();
  }

  changeModule(): void{
    const x = this.selectedModule;
    this.getModuleElement(x);
  }

  changeElement(): void{
    const x = this.selectedElement;
    this.getElementClasse(x);
    this.getProfesseurElement(x);
  }
  changeClasse(): void{
    const x = this.selectedClasse;
    console.log(x);
    for (let i = 0; i < this.classeList.length; i++) {
      if ( this.classeList[i].id == x){
        this.getAllSalles(this.classeList[i].type, this.classeList[i].maxEtudiant);
      }
    }
  }


  submit(): void {
    var emp : Empreq;
    emp = {id: +this.emploi.id!, classeId: +this.selectedClasse!, professeurId: +this.emploi.professeur.id!, salleId: +this.emploi.salle.id!, creneauId: +this.emploi.creneau.id!};
    console.log(emp);
    this.buildpageService.updateEmploiDuTemps(emp).subscribe(
      (request: Emploi) => {
        this.data.emploi = request;
        return String;
      }
      );
    this.dialogRef.close();
  }

  add(): void{
    var emp : Empreq;
    emp = {classeId: +this.selectedClasse!, professeurId: +this.emploi.professeur.id!, salleId: +this.emploi.salle.id!, creneauId: +this.emploi.creneau.id!};
    console.log(emp);
    this.buildpageService.saveEmploiDuTemps(emp).subscribe(
        (request: Emploi) => {
          this.data.emploi = request;
          return Number;
        }
    );
    console.log(emp);
    console.log(this.data.emploi);
    console.log(this.data.emploi.id);
    this.dialogRef.close();
  }

  del(): void {
    // tslint:disable-next-line:no-non-null-assertion
    this.buildpageService.deleteEmploiDuTemps(this.emploi.id!).subscribe(
      (request: string) => {
        console.log(request);
        return Number;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);

      }
      );
    this.close();
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

  public getProfesseurElement(id: number){
    this.profList = [] ;
    this.dataElementService.getProfesseurElement(id).subscribe(
        (response: Prof[]) => {
          this.profList = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public getAllSalles(tp: string, place: number){
    this.salleList = [] ;
    this.datasalleService.getAllSallesByTypeAndPlace(tp, place).subscribe(
        (response: Salle[]) => {
          console.log(response);
          this.salleList = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public getFiliereModules(){
    this.moduleList = [] ;
    this.datafiliereService.getFiliereModules(this.data.dataId).subscribe(
        (response: Module[]) => {
          this.moduleList = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public getModuleElement(id: number){
    this.elementList = [];
    this.datamoduleService.getModuleElements(id).subscribe(
        (response: Element[]) => {
          this.elementList = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public getElementClasse(id: number){
    this.classeList = [];
    this.dataElementService.getElementClasses(id).subscribe(
        (response: Classe[]) => {
          this.classeList = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

}
