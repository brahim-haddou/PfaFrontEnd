import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Classe } from '../DBModels/classe.model';
import { Module } from '../DBModels/module.model';
import { Element } from '../DBModels/element.model';
import {HttpErrorResponse} from '@angular/common/http';
import {DataElementService} from '../dataelement/dataelement.service';
import {DataModuleService} from '../datamodule/datamodule.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detailelement',
  templateUrl: './detailelement.component.html',
  styleUrls: ['./detailelement.component.css']
})
export class DetailelementComponent implements OnInit {

  element!: Element;
  moduleList!: Module[];
  classeList!: Classe[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {element: Element},private dataModuleService: DataModuleService ,private dataElementService: DataElementService, private dialogRef: MatDialogRef<DetailelementComponent>) { }

  ngOnInit(): void {
    this.getClasses();
    this.getAllModules();
  }

  submit(): void {
    this.element = {id: this.data.element.id ,nom: this.data.element.nom, moduleId: this.data.element.moduleId};
    this.updateElement(this.element);
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

  getAllModules(): void {
    this.moduleList = [];
    this.dataModuleService.getAllModules().subscribe(
      (response: Module[]) => {
        this.moduleList = response;
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
