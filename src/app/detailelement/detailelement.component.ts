import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Classe } from '../DBModels/classe.model';
import { Prof } from '../DBModels/prof.model';
import { Element } from '../DBModels/element.model';
import {HttpErrorResponse} from '@angular/common/http';
import {DataElementService} from '../dataelement/dataelement.service';
import {DataprofService} from '../dataprof/dataprof.service';
import { MatDialogRef } from '@angular/material/dialog';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-detailelement',
  templateUrl: './detailelement.component.html',
  styleUrls: ['./detailelement.component.css']
})
export class DetailelementComponent implements OnInit {

  element!: Element;
  moduleList!: Prof[];
  profElementList!: Prof[];
  classeList!: Classe[];
  selectedProf!: Prof[];

  objectCtrl = new FormControl();


  constructor(@Inject(MAT_DIALOG_DATA) public data: {element: Element, dataId: number },private dataprofService: DataprofService ,private dataElementService: DataElementService, private dialogRef: MatDialogRef<DetailelementComponent>) {
   }

  ngOnInit(): void {
    this.getClasses();
    this.getAllModules();
    this.getAllElementProf(Number(this.data.element.id));
  }

  submit(): void {

    const result = this.objectCtrl.value.map((a: { id: any; }) => a.id);
    this.element = {id: this.data.element.id , nom: this.data.element.nom, moduleId: this.data.dataId};
    this.updateElement(this.element);
    for (let i = 0; i < result.length; i++) {
      this.addProfToElement(Number(this.data.element.id), Number(result[i]));
    }
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  updateElement(element: Element): void{
    this.dataElementService.updateElement(element).subscribe(
      (request: Element) => {
        element = request;
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addProfToElement(id: number , pid: number): void{
    this.dataElementService.addProfesseurElement(id, pid).subscribe(
      request => {
        console.log(request);
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deleteProfFromElement(pid: number): void{
    this.dataElementService.deleteProfesseurElement(Number(this.data.element.id), pid).subscribe(
      request => {
        console.log(request);
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getAllModules(): void {
    this.moduleList = [];
    this.dataprofService.getAllProfesseurs().subscribe(
      (response: Prof[]) => {
        this.moduleList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getAllElementProf(id: number): void {
    this.profElementList = [];
    this.dataElementService.getProfesseurElement(id).subscribe(
      (response: Prof[]) => {
        this.profElementList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getClasses(): void {
    this.classeList= [];
    this.dataElementService.getClasses(this.data.element).subscribe(
      (response: Classe[]) => {
        this.classeList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
