import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Prof } from '../DBModels/prof.model';
import { Task } from '../DBModels/Task';
import { SideNavService } from '../side-nav.service';
import {MatDialog} from '@angular/material/dialog';
import { ProfaddformComponent } from '../profaddform/profaddform.component';
import { ProfdetailComponent } from '../profdetail/profdetail.component';

@Component({
  selector: 'app-dataprof',
  templateUrl: './dataprof.component.html',
  styleUrls: ['../datalist.css']
})
export class DataprofComponent implements OnInit, AfterViewInit {

  elementList: Prof[];
  task: Task;
  allComplete: boolean;
  delDisabled: boolean;

  searchText!: string;

  constructor(private sideNavService: SideNavService, public dialog: MatDialog) {
    this.elementList = [] ;
    this.task = {completed: false, subtasks: []};
    this.allComplete = false;
    this.delDisabled = true;
   }

  ngOnInit(): void {
    this.elementList = [] ;
    this.task = {completed: false, subtasks: []};
    this.allComplete = false;
    this.delDisabled = true;
    for (let i = 0; i < 4; i++) {
      this.elementList.push({id : 0, name : 'element'+i , hour_count : 0,isSelected : {completed: false}});   
      this.task.subtasks?.push(this.elementList[i].isSelected)   
    }
  }

  openFormDialog() {
    this.dialog.open(ProfaddformComponent);
  }

  openDetailDialog() {
    this.dialog.open(ProfdetailComponent);
  }

  delElement(p: Prof) {
    const index = this.elementList.indexOf(p);
    // delete from data base
    delete this.elementList[index];
    this.elementList.splice(index, 1);
    this.updateAllComplete()
  }

  selecDelete() {
    /*delete from database then reload table */
    for(var x of this.elementList) {
      if(x.isSelected.completed)
      {
        const index = this.elementList.indexOf(x);
        delete this.elementList[index];
        this.elementList.splice(index, 1);
      }
    }
  }

  clickMenu() { 
    this.sideNavService.toggle();
  }

  updateAllComplete() {
    if(this.task.subtasks != null && this.task.subtasks.some(t => t.completed)) {
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

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    if(this.task.subtasks != null && this.task.subtasks.some(t => t.completed)) {
      this.delDisabled = false;
    }
    if(this.task.subtasks != null && this.task.subtasks.every(t => !t.completed)) {
      this.delDisabled = false;
    }
    if(this.task.subtasks != null && this.task.subtasks.every(t => t.completed))
    {
      this.delDisabled = true;
    }
    
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  ngAfterViewInit() {
  }
}

