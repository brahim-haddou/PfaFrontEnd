import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Classe } from '../DBModels/classe.model';
import { Element } from '../DBModels/element.model';
import {HttpErrorResponse} from '@angular/common/http';
import {DataElementService} from '../dataelement/dataelement.service';
import {DataClasseService} from '../dataclasse/dataclasse.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detailclasse',
  templateUrl: './detailclasse.component.html',
  styleUrls: ['./detailclasse.component.css']
})
export class DetailclasseComponent implements OnInit {

  classe!: Classe;
  elementList: Element[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {classe: Classe, dataId: number }, private dataClasseService: DataClasseService ,private dataElementService: DataElementService, private dialogRef: MatDialogRef<DetailclasseComponent>) { }

  ngOnInit(): void {
    //this.getAllElements();
  }

  submit(): void {
    this.classe = {id: this.data.classe.id ,nom: this.data.classe.nom,type : this.data.classe.type,maxEtudiant : this.data.classe.maxEtudiant , elementId: this.data.dataId};
    this.updateClasse(this.classe);
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  updateClasse(classe: Classe): void{
    this.dataClasseService.updateClasse(classe).subscribe(
      (request: Classe) => {
        classe = request;
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getAllElements(): void {
    this.elementList = [];
    this.dataElementService.getAllElements().subscribe(
      (response: Element[]) => {
        this.elementList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
