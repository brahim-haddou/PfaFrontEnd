import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Prof } from '../DBModels/prof.model';
import { Element } from '../DBModels/element.model';
import {HttpErrorResponse} from '@angular/common/http';
import {DataprofService} from '../dataprof/dataprof.service';
import {DataElementService} from '../dataelement/dataelement.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detailprof',
  templateUrl: './detailprof.component.html',
  styleUrls: ['./detailprof.component.css']
})
export class DetailprofComponent implements OnInit {

  prof!: Prof;
  elementList!: Element[];

  // @ts-ignore
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public data: {prof: Prof}, private dataElementService: DataElementService, private dataprofService: DataprofService, private dialogRef: MatDialogRef<DetailprofComponent>) { }

  ngOnInit(): void {
    this.getProfesseurElements(this.data.prof);
  }

  save(): void {
    window.location.href = `http://localhost:8081/api/emploiDuTemps/professeur/${this.data.prof.id}/excel`;
  }

  submit(): void {
    this.prof = {id: this.data.prof.id , nom: this.data.prof.nom};
    this.updateProfesseur(this.prof);
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  updateProfesseur(prof: Prof): void{
    this.dataprofService.updateProfesseur(this.prof).subscribe(
      (request: Prof) => {
        this.prof = request;
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getProfesseurElements(prof: Prof): void {
    this.elementList= [];
    this.dataprofService.getProfesseurElements(this.data.prof).subscribe(
      (response: Element[]) => {
        this.elementList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deleteElementFromProf(elem: Element): void {
    this.dataElementService.deleteProfesseurElement(Number(elem.id), Number(this.data.prof.id)).subscribe(
        (request: any) => {
        console.log(request);
        this.elementList = this.elementList.filter(obj => obj !== elem);
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
