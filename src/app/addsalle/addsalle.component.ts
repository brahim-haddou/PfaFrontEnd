import { Component, OnInit, Inject} from '@angular/core';
import { Salle } from '../DBModels/salle.model';
import {HttpErrorResponse} from '@angular/common/http';
import {DatasalleService} from '../datasalle/datasalle.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addsalle',
  templateUrl: './addsalle.component.html',
  styleUrls: ['./addsalle.component.css']
})
export class AddsalleComponent implements OnInit {

  nom!: string;
  type!: string;
  maxPlace!: number;
  salle!: Salle;

  constructor(private datasalleService: DatasalleService, private dialogRef: MatDialogRef<AddsalleComponent>) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.salle = {nom: this.nom, type : this.type, maxPlace : this.maxPlace};
    this.createSalle(this.salle);
    this.dialogRef.close();
  }

  createSalle(salle: Salle): void{
    this.datasalleService.createSalle(salle).subscribe(
      (request: Salle) => {
        salle = request;
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
