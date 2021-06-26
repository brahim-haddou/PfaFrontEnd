import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Filiere } from '../DBModels/filiere.model';
import { Module } from '../DBModels/module.model';
import { Element } from '../DBModels/element.model';
import {HttpErrorResponse} from '@angular/common/http';
import {DatafiliereService} from '../datafiliere/datafiliere.service';
import {DataModuleService} from '../datamodule/datamodule.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detailmodule',
  templateUrl: './detailmodule.component.html',
  styleUrls: ['./detailmodule.component.css']
})
export class DetailmoduleComponent implements OnInit {

  module!: Module;
  filiereList!: Filiere[];
  elementList!: Element[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {module: Module},private dataModuleService: DataModuleService ,private datafiliereService: DatafiliereService, private dialogRef: MatDialogRef<DetailmoduleComponent>) { }

  ngOnInit(): void {
    this.getElements();
    this.getAllFilieres();
  }

  submit(): void {
    this.module = {id: this.data.module.id ,nom: this.data.module.nom, filiereId: this.data.module.filiereId};
    this.updateModule(this.module);
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  updateModule(module: Module): void{
    this.dataModuleService.updateModule(module).subscribe(
      (request: Module) => {
        module = request;
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getAllFilieres(): void {
    this.filiereList = [];
    this.datafiliereService.getAllFilieres().subscribe(
      (response: Filiere[]) => {
        this.filiereList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getElements(): void {
    this.elementList= [];
    this.dataModuleService.getElements(this.data.module).subscribe(
      (response: Module[]) => {
        this.elementList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
