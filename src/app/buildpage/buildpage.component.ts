import { Component, OnInit } from '@angular/core';
import { Emploi } from '../DBModels/emploi.model';
import { Empreq } from '../DBModels/empreq.model';
import { Creneau } from '../DBModels/creneau.model';
import {HttpErrorResponse} from '@angular/common/http';
import {BuildpageService} from './buildpage.service';
import { DetailemploiComponent } from '../detailemploi/detailemploi.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

interface Debutfin {
  debut: number;
  fin: number;
}

@Component({
  selector: 'app-buildpage',
  templateUrl: './buildpage.component.html',
  styleUrls: ['./buildpage.component.css']
})
export class BuildpageComponent implements OnInit {

  col!: number;
  colcount!: number;
  emploi!: Emploi[];
  creneau!: Creneau[];
  header!: number[];
  debfinTable!: Debutfin[];
  public show = true;


  dataId!: number;


  constructor(private buildpageService: BuildpageService,  public dialog: MatDialog, private activatedRoute: ActivatedRoute) {
   }

   reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }


   sameCrenaux(index: number, pos: number): boolean{
    return index % this.colcount === pos;
   }

   ngOnInit(): void {
    //this.dataId = this.activatedRoute.snapshot.params.id;
    this.activatedRoute.queryParams.subscribe(queryParams => {

    });
    this.activatedRoute.params.subscribe(routeParams => {
      this.dataId = routeParams.id;
      console.log(routeParams.id);
      this.reload();
    });
    this.creneau = [];
    this.colcount = 4;
    // this.initEmploi();
    this.tableInit(this.colcount);
    this.getCreneau();
  }

  /*initEmploi(): void{
    var emploiBD : Emploi[];
    emploiBD = [];
    this.buildpageService.getFiliereEmploiDuTemps(this.dataId).subscribe(
      (request: Emploi[]) => {
        emploiBD = request;
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    var count: number = 0;
    if (emploiBD.length != 0) {
      for (let i = 0; i < emploiBD.length; i++) {
        if (emploiBD[i].creneau.jour == "Lundi") {
          count++;
        }
      }
      this.colcount = count;
      this.emploi = emploiBD;
    }
    else{
      this.tableInit(this.colcount);
    }
  }*/

  openDetailDialog(emploi : Emploi){
    var req: boolean = true;
    var dataId : number = this.dataId;
    if (emploi.classe.nom == "" && emploi.professeur.nom == "") {
      req = false;
    }
    const dialog = this.dialog.open(DetailemploiComponent , {
      data: { emploi, req, dataId },
    });
    dialog.afterClosed().subscribe(() => {
      console.log(emploi.id);
      this.reload();
    });
  }

  submitCrenau(): void {
    let counter = 0;
    this.creneau = [];
    console.log(this.debfinTable)
    for (let l = 0; l < 6 * this.colcount; l++) {
      if (l >= 0 && l < this.colcount) {
        this.creneau.push({jour: 'Lundi', debut : 0, fin : 0, filiereId: this.dataId});
      }
      if (l >= this.colcount && l < this.colcount * 2) {
        this.creneau.push({jour: 'Mardi', debut : 0, fin : 0, filiereId: this.dataId});
      }
      if (l >= this.colcount * 2 && l < this.colcount * 3) {
        this.creneau.push({jour: 'Mercredi', debut : 0, fin : 0, filiereId: this.dataId});
      }
      if (l >= this.colcount * 3 && l < this.colcount * 4) {
        this.creneau.push({jour: 'Jeudi', debut : 0, fin : 0, filiereId: this.dataId});
      }
      if (l >= this.colcount * 4 && l < this.colcount * 5) {
        this.creneau.push({jour: 'Vendredi', debut : 0, fin : 0, filiereId: this.dataId});
      }
      if (l >= this.colcount * 5 && l < this.colcount * 6) {
        this.creneau.push({jour: 'Samedi', debut : 0, fin : 0, filiereId: this.dataId});
      }
    }
    
    console.log(this.colcount);
    for (let i = 0; i < this.colcount * 6; i++) {
      console.log(counter);
      this.creneau[i].debut = +this.debfinTable[counter].debut;
      this.creneau[i].fin = +this.debfinTable[counter].fin;
      counter++;
      if (counter == this.colcount) {
        counter = 0;
      }
    }
    console.log(this.creneau);
    this.buildpageService.deleteCreneau(this.dataId).subscribe();
    this.buildpageService.createCreneau(this.creneau).subscribe(
      (request: Creneau[]) => {
        this.creneau = request;
        this.tableInit(this.colcount);
        // this.reload();
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  tableInit(x: number): void{
    this.emploi = [];
    this.header = [];
    this.debfinTable = [];
    for (let k = 0; k < x; k++) {
      this.header.push(k);
      this.debfinTable.push({debut : 0, fin : 0});
    }
    if (this.creneau.length === 0 ){
      for (let l = 0; l < 6 * x; l++) {
        if (l >= 0 && l < x) {
          this.creneau.push({jour: 'Lundi', debut : 0, fin : 0, filiereId: this.dataId});
        }
        if (l >= x && l < x * 2) {
          this.creneau.push({jour: 'Mardi', debut : 0, fin : 0, filiereId: this.dataId});
        }
        if (l >= x * 2 && l < x * 3) {
          this.creneau.push({jour: 'Mercredi', debut : 0, fin : 0, filiereId: this.dataId});
        }
        if (l >= x * 3 && l < x * 4) {
          this.creneau.push({jour: 'Jeudi', debut : 0, fin : 0, filiereId: this.dataId});
        }
        if (l >= x * 4 && l < x * 5) {
          this.creneau.push({jour: 'Vendredi', debut : 0, fin : 0, filiereId: this.dataId});
        }
        if (l >= x * 5 && l < x * 6) {
          this.creneau.push({jour: 'Samedi', debut : 0, fin : 0, filiereId: this.dataId});
        }
      }
    }

    /*this.buildpageService.deleteCreneau().subscribe();
    this.buildpageService.createCreneau(this.creneau).subscribe(
      (request: Creneau[]) => {
        this.creneau = request;
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );*/

    for (let i = 0; i < 6 * x; i++) {
        this.emploi.push(
          {
            id: 0,
            classe : {
              id : 0,
              nom : '',
              type : '',
              maxEtudiant : 0
            },
            index: i,
            professeur : {
              id : 0,
              nom : ''
            },
            salle : {
              id : 0,
              nom: '',
              type : '',
              maxPlace : 0
            },
            creneau : this.creneau[i]
          }
        );
    }

    /*this.emploi.forEach(element => {
      var emp: Empreq;
      emp = {id : element.id, classeId : element.classe.id, professeurId : element.professeur.id, salleId : element.salle.id, creneauId : element.creneau.id};
      this.buildpageService.saveEmploiDuTemps(emp).subscribe(
        (request: Emploi) => {
          element = request;
          return String;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    });*/

    this.reload();
  }

   changeCols(): void {
    this.colcount = this.col;
    this.tableInit(this.colcount);
   }

   save(): void {
    this.buildpageService.excelFiliereEmploiDuTemps(this.dataId).subscribe(
      (request: Blob) => {
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
   }

  // tslint:disable-next-line:typedef
  public getCreneau(){
    this.creneau = [] ;
    this.buildpageService.getCreneau(this.dataId).subscribe(
      (response: Creneau[]) => {
        if (response.length !== 0){
          this.creneau = response;
          this.colcount = this.numCol(this.creneau);
          console.log(this.creneau);
          this.tableInit(this.colcount);
          this.getFiliereEmploiDuTemps(this.dataId);
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.reload();
  }
// tslint:disable-next-line:typedef
  public getFiliereEmploiDuTemps(filiereId: number){
    this.creneau = [] ;
    this.buildpageService.getFiliereEmploiDuTemps(filiereId).subscribe(
      (response: Emploi[]) => {
        if (response.length !== 0){
          this.mergeCreneauwithFiliereEmploi(this.emploi, response);
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.reload();
  }
  numCol(cre: Creneau[]): number {
    let n = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let l = 0; l < cre.length; l++){
      if (cre[l].jour === 'Lundi') {
        n++;
      }
    }
    return n;
  }
  // TODO: merge Creneau with FiliereEmploi
  mergeCreneauwithFiliereEmploi(empl: Emploi[], emplFiliere: Emploi[]): Emploi[] {
    for (let l = 0; l < emplFiliere.length; l++){
      for (let n = 0; n < empl.length; n++){
        if (
          emplFiliere[l].creneau.jour === empl[n].creneau.jour
          &&
          emplFiliere[l].creneau.debut === empl[n].creneau.debut
          &&
          emplFiliere[l].creneau.fin === empl[n].creneau.fin
        ){
          empl[n].id = emplFiliere[l].id;
          empl[n].classe = emplFiliere[l].classe;
          empl[n].professeur = emplFiliere[l].professeur;
          empl[n].salle = emplFiliere[l].salle;
        }
      }
    }
    return empl;
  }
}
