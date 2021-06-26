import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Module } from '../DBModels/module.model';
import {HttpErrorResponse} from '@angular/common/http';
import {DataModuleService} from '../datamodule/datamodule.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addmodule',
  templateUrl: './addmodule.component.html',
  styleUrls: ['./addmodule.component.css']
})
export class AddmoduleComponent implements OnInit {

  nom!: string;
  module!: Module;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {dataId: number},private datamoduleService: DataModuleService, private dialogRef: MatDialogRef<AddmoduleComponent>) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.module = {nom: this.nom, filiereId : this.data.dataId};
    this.createModule(this.module);
    this.dialogRef.close();
  }

  createModule(module: Module): void{
    this.datamoduleService.createModule(module).subscribe(
      (request: Module) => {
        module = request;
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
