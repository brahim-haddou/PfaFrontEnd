import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Module } from '../DBModels/module.model';
import { Task } from '../DBModels/Task';
import { SideNavService } from '../side-nav.service';

@Component({
  selector: 'app-datamodule',
  templateUrl: './datamodule.component.html',
  styleUrls: ['../datalist.css']
})
export class DatamoduleComponent implements OnInit, AfterViewInit {

  elementList: Module[] = [
    {id : 0, nom : 'element1', isSelected : {completed: false}},
    {id : 0, nom : 'element2', isSelected : {completed: false}},
    {id : 0, nom : 'element3', isSelected : {completed: false}}
  ];
  task: Task = {
    completed: false,
    subtasks: [
      this.elementList[0].isSelected,
      this.elementList[1].isSelected,
      this.elementList[2].isSelected
    ]
  };
  allComplete: boolean = false;
  delDisabled: boolean = true;

  searchText!: string;

  quizId!: Variable;

  constructor(private sideNavService: SideNavService, private activatedRoute: ActivatedRoute) { }

  delElement(p: Module) {
    for(var x of this.elementList) {
      if(p == x) {
        const index = this.elementList.indexOf(x);
        delete this.elementList[index];
        this.elementList.splice(index, 1);
      }
    }
    this.updateAllComplete()
  }

  selecDelete() {
    for(var x of this.elementList) {
      if(x.isSelected.completed)
      {
        const index = this.elementList.indexOf(x);
        delete this.elementList[index];
        this.elementList.splice(index);
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

  ngOnInit(): void {
    this.quizId = this.activatedRoute.snapshot.params['id'];
  }

}
