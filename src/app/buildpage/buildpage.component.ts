import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Emploi } from '../DBModels/emploi.model';
import { Creneau } from '../DBModels/creneau.model';

interface Debutfin {
  debut : number;
  fin : number;
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


  constructor() {
   }

   reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }


   sameCrenaux(index : number, pos : number): boolean{
    if(index % this.colcount === pos){
      return true;
    }else{
      return false;
    }
   }

   ngOnInit(): void {
    this.colcount = 4;
    this.tableInit(this.colcount);
  }

  submitCrenau(): void {
    var counter = 0;
    for (let i = 0; i < this.colcount*6; i++) {
      if (counter == this.colcount) {
        counter = 0;
      }
      this.creneau[i].debut = this.debfinTable[counter].debut;
      this.creneau[i].fin = this.debfinTable[counter].fin;
      counter++;
    }
  }

  tableInit(x : number): void{
    this.emploi = [];
    this.header= [];
    this.creneau = [];
    this.debfinTable = [];
    for (let k = 0; k < x; k++) {
      this.header.push(k);
      this.debfinTable.push({debut : 0, fin : 0})
    }
    for (let l = 0; l < 6*x; l++) {
        if (l>=0 && l<x*1) {
          this.creneau.push({jour: "Lundi", debut : 0, fin : 0});
        }
        if (l>=x*1 && l<x*2) {
          this.creneau.push({jour: "Mardi", debut : 0, fin : 0});
        }
        if (l>=x*2 && l<x*3) {
          this.creneau.push({jour: "Mercredi", debut : 0, fin : 0});
        }
        if (l>=x*3 && l<x*4) {
          this.creneau.push({jour: "Jeudi", debut : 0, fin : 0});
        }
        if (l>=x*4 && l<x*5) {
          this.creneau.push({jour: "Vendredi", debut : 0, fin : 0});
        }
        if (l>=x*5 && l<x*6) {
          this.creneau.push({jour: "Samedi", debut : 0, fin : 0});
        }
    }
    for (let i = 0; i < 6*x; i++) {
        this.emploi.push(
          {
            id : 0,
            classe : {
              id : 0,
              nom : "classe1",
              type : "cour",
              maxEtudiant : 40
            },
            index: i,
            professeur : {
              id : 0,
              nom : "prof1"
            },
            salle : {
              id : 0,
              nom: "salle1",
              type : "amphi",
              maxPlace : 200
            },
            creneau : this.creneau[i]
          }
        );
      
    }
        
    this.reload();
  }

   changeCols(): void {
    this.colcount=this.col;
    this.tableInit(this.colcount);
   }

   save():void {


   }

 

}
