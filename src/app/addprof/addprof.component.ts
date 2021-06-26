import { Component, OnInit } from '@angular/core';
import { Prof } from '../DBModels/prof.model';
import {HttpErrorResponse} from '@angular/common/http';
import {DataprofService} from '../dataprof/dataprof.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addprof',
  templateUrl: './addprof.component.html',
  styleUrls: ['./addprof.component.css']
})
export class AddprofComponent implements OnInit {

  nom!: string;
  prof!: Prof;

  constructor(private dataprofService: DataprofService, private dialogRef: MatDialogRef<AddprofComponent>) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.prof = {nom: this.nom};
    this.createProfesseur(this.prof);
    this.dialogRef.close();
  }
  
  createProfesseur(prof: Prof): void{
    this.dataprofService.createProfesseur(this.prof).subscribe(
      (request: Prof) => {
        this.prof = request;
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
