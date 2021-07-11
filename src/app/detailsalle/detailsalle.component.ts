import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Salle } from '../DBModels/salle.model';
import {HttpErrorResponse} from '@angular/common/http';
import {DataElementService} from '../dataelement/dataelement.service';
import {DatasalleService} from '../datasalle/datasalle.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detailsalle',
  templateUrl: './detailsalle.component.html',
  styleUrls: ['./detailsalle.component.css']
})
export class DetailsalleComponent implements OnInit {

  salle!: Salle;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {salle: Salle},private datasalleService: DatasalleService ,private dataElementService: DataElementService, private dialogRef: MatDialogRef<DetailsalleComponent>) { }

  ngOnInit(): void {
  }

  save(): void{
    
  }

  submit(): void {
    this.salle = {id: this.data.salle.id, nom: this.data.salle.nom,type : this.data.salle.type,maxPlace : this.data.salle.maxPlace};
    this.updateSalle(this.salle);
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  updateSalle(salle: Salle): void{
    this.datasalleService.updateSalle(salle).subscribe(
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
