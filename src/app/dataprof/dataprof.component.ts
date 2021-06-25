import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Prof } from '../DBModels/prof.model';
import { Task } from '../DBModels/Task';
import { SideNavService } from '../side-nav.service';
import {MatDialog} from '@angular/material/dialog';
import { AddprofComponent } from '../addprof/addprof.component';
import {HttpErrorResponse} from '@angular/common/http';

import {DataprofService} from './dataprof.service';

@Component({
  selector: 'app-dataprof',
  templateUrl: './dataprof.component.html',
  styleUrls: ['../datalist.css']
})
export class DataprofComponent implements OnInit {

  elementList: Prof[];
  task: Task;
  allComplete: boolean;
  delDisabled: boolean;

  searchText!: string;

  constructor(private dataprofService: DataprofService, private sideNavService: SideNavService, public dialog: MatDialog) {
    this.elementList = [] ;
    this.task = {completed: false, subtasks: []};
    this.allComplete = false;
    this.delDisabled = true;
   }

  ngOnInit(): void {
    this.getAllProfesseurs();
    // this.elementList = [] ;
    // this.task = {completed: false, subtasks: []};
    // this.allComplete = false;
    // this.delDisabled = true;
    // for (let i = 0; i < 4; i++) {
    //   this.elementList.push({id : 0, nom : 'Prof' + i , isSelected : {completed: false}});
    //   this.task.subtasks?.push(this.elementList[i].isSelected);
  }


  // tslint:disable-next-line:typedef
  openFormDialog(){
    console.log(this.elementList);
    this.dialog.open(AddprofComponent);
  }

  // tslint:disable-next-line:typedef
  openDetailDialog(){
    //this.dialog.open();
  }

  // tslint:disable-next-line:typedef
  delElement(p: Prof){
    //const index = this.elementList.indexOf(p);
    // delete from data base
    //delete this.elementList[index];
    //this.elementList.splice(index, 1);
    this.dataprofService.deleteProfesseur(p.id).subscribe(
      (response: string) => {
          return String;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.updateAllComplete();
    this.getAllProfesseurs();
  }

  // tslint:disable-next-line:typedef
  selecDelete() {
    /*delete from database then reload table */
    for (const x of this.elementList) {
      if (x.isSelected.completed)
      {
        //const index = this.elementList.indexOf(x);
        //delete this.elementList[index];
        //this.elementList.splice(index, 1);
        this.dataprofService.deleteProfesseur(x.id).subscribe(
          (response: string) => {
              return String;
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
          );
      }
    }
    this.getAllProfesseurs();
  }

  // tslint:disable-next-line:typedef
  clickMenu() {
    this.sideNavService.toggle();
  }

  // tslint:disable-next-line:typedef
  updateAllComplete(){
    if (this.task.subtasks != null && this.task.subtasks.some(t => t.completed)) {
      this.delDisabled = false;
    }
    else {
      this.delDisabled = true;
    }
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  // tslint:disable-next-line:typedef
  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    if (this.task.subtasks != null && this.task.subtasks.some(t => t.completed)) {
      this.delDisabled = false;
    }
    if (this.task.subtasks != null && this.task.subtasks.every(t => !t.completed)) {
      this.delDisabled = false;
    }
    if (this.task.subtasks != null && this.task.subtasks.every(t => t.completed)) {
      this.delDisabled = true;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  // tslint:disable-next-line:typedef
  public getAllProfesseurs(){
    this.elementList = [] ;
    this.task = {completed: false, subtasks: []};
    this.allComplete = false;
    this.delDisabled = true;
    this.dataprofService.getAllProfesseurs().subscribe(
        (response: Prof[]) => {
          this.elementList = response;
          this.elementList.map((obj) => {
            obj.isSelected = {completed : false};
            return obj;
          });
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      for (let i = 0; i < this.elementList.length; i++) {
        this.task.subtasks?.push(this.elementList[i].isSelected);
      }
  }
}
