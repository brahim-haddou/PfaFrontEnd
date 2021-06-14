import { Component, Input, OnInit } from '@angular/core';
import { Emploi } from '../DBModels/emploi.model';
import { Creneau } from '../DBModels/creneau.model';

@Component({
  selector: 'app-buildpage',
  templateUrl: './buildpage.component.html',
  styleUrls: ['./buildpage.component.css']
})
export class BuildpageComponent implements OnInit {

  col! : number;
  colcount!: number;  
  emploi: Emploi[];
  creneau: Creneau[];
  header: number[];

  constructor() {
    this.emploi = [];
    this.creneau = [];
    this.header = [];
    this.colcount = 4;
    for (let k = 0; k < this.colcount; k++) {
      this.header.push(k);
    }
    for (let l = 0; l < this.colcount*6; l++) {
      if (l>=0 && l<this.colcount*1) {
        this.creneau.push({id : 0, jour: "Lundi", debut : 0, fin : 0});
      }
      if (l>=this.colcount*1 && l<this.colcount*2) {
        this.creneau.push({id : 0, jour: "Mardi", debut : 0, fin : 0});
      }
      if (l>=this.colcount*2 && l<this.colcount*3) {
        this.creneau.push({id : 0, jour: "Mercredi", debut : 0, fin : 0});
      }
      if (l>=this.colcount*3 && l<this.colcount*4) {
        this.creneau.push({id : 0, jour: "Jeudi", debut : 0, fin : 0});
      }
      if (l>=this.colcount*4 && l<this.colcount*5) {
        this.creneau.push({id : 0, jour: "Vendredi", debut : 0, fin : 0});
      }
      if (l>=this.colcount*5 && l<this.colcount*6) {
        this.creneau.push({id : 0, jour: "Samedi", debut : 0, fin : 0});
      }
    }
    for (let i = 0; i < this.colcount*6; i++) {
      this.emploi.push({id : 0, index : i, classe : {id : 0, nom : "classe1", type : "cour", maxEtudiant : 40, 
    elements : [{id : 0, nom : "element1", module : [ { id : 0, nom : "module1", 
    filieres: [{id : 0, nom : "filiere1", isSelected : {completed : false}}], isSelected : {completed : false} }], 
    isSelected : {completed : false}}], isSelected : { completed : false}}, prof : {id : 0, name : "prof1", 
    hour_count : 0, isSelected : { completed : false} }, salle : {id : 0, nom: "salle1", 
  type : "amphi", maxPlace : 200, isSelected : {completed : false}}, creneau : this.creneau[i]}); 
      
    }
    
   }

   changeCols(): void {
    this.colcount = this.col;
    this.emploi = [];
    this.creneau = [];
    this.header = [];
    for (let k = 0; k < this.colcount; k++) {
      this.header.push(k);
    }
     for (let l = 0; l < this.colcount*6; l++) {
      if (l>=0 && l<this.colcount*1) {
        this.creneau.push({id : 0, jour: "Lundi", debut : 0, fin : 0});
      }
      if (l>=this.colcount*1 && l<this.colcount*2) {
        this.creneau.push({id : 0, jour: "Mardi", debut : 0, fin : 0});
      }
      if (l>=this.colcount*2 && l<this.colcount*3) {
        this.creneau.push({id : 0, jour: "Mercredi", debut : 0, fin : 0});
      }
      if (l>=this.colcount*3 && l<this.colcount*4) {
        this.creneau.push({id : 0, jour: "Jeudi", debut : 0, fin : 0});
      }
      if (l>=this.colcount*4 && l<this.colcount*5) {
        this.creneau.push({id : 0, jour: "Vendredi", debut : 0, fin : 0});
      }
      if (l>=this.colcount*5 && l<this.colcount*6) {
        this.creneau.push({id : 0, jour: "Samedi", debut : 0, fin : 0});
      }
    }
    for (let i = 0; i < this.col*6; i++) {
      this.emploi.push({id : 0, index : i, classe : {id : 0, nom : "classe1", type : "cour", maxEtudiant : 40, 
    elements : [{id : 0, nom : "element1", module : [ { id : 0, nom : "module1", 
    filieres: [{id : 0, nom : "filiere1", isSelected : {completed : false}}], isSelected : {completed : false} }], 
    isSelected : {completed : false}}], isSelected : { completed : false}}, prof : {id : 0, name : "prof1", 
    hour_count : 0, isSelected : { completed : false} }, salle : {id : 0, nom: "salle1", 
  type : "amphi", maxPlace : 200, isSelected : {completed : false}}, creneau : this.creneau[i]}); 
      
    }
    this.colcount = this.col;
   }

  ngOnInit(): void {
  }

}
