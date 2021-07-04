import { Component, OnInit } from '@angular/core';
import { Emploi } from '../DBModels/emploi.model';
import { Creneau } from '../DBModels/creneau.model';
import {HttpErrorResponse} from '@angular/common/http';
import {BuildpageService} from './buildpage.service';

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


  constructor(private buildpageService: BuildpageService, ) {
   }

   reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }


   sameCrenaux(index: number, pos: number): boolean{
    return index % this.colcount === pos;
   }

   ngOnInit(): void {
    this.creneau = [];
    this.colcount = 4;
    this.tableInit(this.colcount);
    this.getCreneau();

  }

  submitCrenau(): void {
    let counter = 0;
    for (let i = 0; i < this.colcount * 6; i++) {
      if (counter === this.colcount) {
        counter = 0;
      }
      this.creneau[i].debut = this.debfinTable[counter].debut;
      this.creneau[i].fin = this.debfinTable[counter].fin;
      counter++;
    }
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
          this.creneau.push({jour: 'Lundi', debut : 0, fin : 0});
        }
        if (l >= x && l < x * 2) {
          this.creneau.push({jour: 'Mardi', debut : 0, fin : 0});
        }
        if (l >= x * 2 && l < x * 3) {
          this.creneau.push({jour: 'Mercredi', debut : 0, fin : 0});
        }
        if (l >= x * 3 && l < x * 4) {
          this.creneau.push({jour: 'Jeudi', debut : 0, fin : 0});
        }
        if (l >= x * 4 && l < x * 5) {
          this.creneau.push({jour: 'Vendredi', debut : 0, fin : 0});
        }
        if (l >= x * 5 && l < x * 6) {
          this.creneau.push({jour: 'Samedi', debut : 0, fin : 0});
        }
      }
    }
    for (let i = 0; i < 6 * x; i++) {
        this.emploi.push(
          {
            id : 0,
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

    this.reload();
  }

   changeCols(): void {
    this.colcount = this.col;
    this.tableInit(this.colcount);
   }

   save(): void {
   }

  // tslint:disable-next-line:typedef
  public getCreneau(){
    this.creneau = [] ;
    this.buildpageService.getCreneau().subscribe(
      (response: Creneau[]) => {
        if (response.length !== 0){
          this.creneau = response;
          this.colcount = this.numCol(this.creneau);
          console.log(this.creneau);
          this.tableInit(this.colcount);
          this.getFiliereEmploiDuTemps(1);
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
          empl[n].classe = emplFiliere[l].classe;
          empl[n].professeur = emplFiliere[l].professeur;
          empl[n].salle = emplFiliere[l].salle;
        }
      }
    }
    return empl;
  }
}
