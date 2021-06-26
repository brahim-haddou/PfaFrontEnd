import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Element } from '../DBModels/element.model';
import {HttpErrorResponse} from '@angular/common/http';
import {DataElementService} from '../dataelement/dataelement.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addelement',
  templateUrl: './addelement.component.html',
  styleUrls: ['./addelement.component.css']
})
export class AddelementComponent implements OnInit {

  nom!: string;
  element!: Element;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {dataId: number},private dataElementService: DataElementService, private dialogRef: MatDialogRef<AddelementComponent>) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.element = {nom: this.nom, moduleId : this.data.dataId};
    this.createElement(this.element);
    this.dialogRef.close();
  }

  createElement(element: Element): void{
    this.dataElementService.createElement(element).subscribe(
      (request: Element) => {
        element = request;
        return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
