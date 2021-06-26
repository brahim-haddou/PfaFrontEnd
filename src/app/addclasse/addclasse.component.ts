import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Classe } from '../DBModels/classe.model';
import {HttpErrorResponse} from '@angular/common/http';
import {DataClasseService} from '../dataclasse/dataclasse.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addclasse',
  templateUrl: './addclasse.component.html',
  styleUrls: ['./addclasse.component.css']
})
export class AddclasseComponent implements OnInit {

  nom!: string;
  type!: string;
  maxEtudian!: number;
  classe!: Classe;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {dataId: number},private dataClasseService: DataClasseService, private dialogRef: MatDialogRef<AddclasseComponent>) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.classe = {nom: this.nom, type : this.type, maxEtudiant : this.maxEtudian, elementId : this.data.dataId};
    this.createClasse(this.classe);
    this.dialogRef.close();
  }

  createClasse(classe: Classe): void{
    this.dataClasseService.createClasse(classe).subscribe(
      (request: Classe) => {
        classe = request;
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
