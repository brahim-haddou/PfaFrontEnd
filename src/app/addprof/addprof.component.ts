import { Component, OnInit } from '@angular/core';
import { Prof } from '../DBModels/prof.model';
import {HttpErrorResponse} from '@angular/common/http';
import {DataprofService} from '../dataprof/dataprof.service';

@Component({
  selector: 'app-addprof',
  templateUrl: './addprof.component.html',
  styleUrls: ['./addprof.component.css']
})
export class AddprofComponent implements OnInit {

  nom!: string;

  constructor(private dataprofService: DataprofService) { }

  ngOnInit(): void {
  }

  submit(): void {
    const prof: Prof = {id: 0, nom: this.nom, isSelected : {completed: false}};
    this.dataprofService.createProfesseur(prof).subscribe(
      (response: Prof) => {
          return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
