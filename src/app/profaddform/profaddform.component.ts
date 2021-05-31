import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Module } from '../DBModels/module.model';

@Component({
  selector: 'app-profaddform',
  templateUrl: './profaddform.component.html',
  styleUrls: ['./profaddform.component.css']
})
export class ProfaddformComponent {
  
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  objectCtrl = new FormControl();
  filteredobjects: Observable<Module[]>;
  objects: Module[] = [{name : 'element0', isSelected : {completed: false}}];
  allobjects: Module[] = [
    {name : 'omar', isSelected : {completed: false}},
    {name : 'heddi', isSelected : {completed: false}},
    {name : 'ossaa', isSelected : {completed: false}}
  ];

  @ViewChild('objectInput') objectInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  constructor() {
    this.filteredobjects = this.objectCtrl.valueChanges.pipe(
        startWith(null),
        map((object: string | null) => object ? this._filter(object) : this.allobjects.slice()));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our object
    if (value) {
      this.objects.push({name : value, isSelected : {completed: false}});
    }

    // Clear the input value
    this.objectCtrl.reset;

    this.objectCtrl.setValue(null);
  }

  remove(object: Module): void {
    const index = this.objects.indexOf(object);

    if (index >= 0) {
      this.objects.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.objects.push({name :event.option.viewValue, isSelected : {completed: false}});
    this.objectInput.nativeElement.value = '';
    this.objectCtrl.setValue(null);
  }

  private _filter(value: string): Module[] {
    const filterValue = value.toLowerCase();

    return this.allobjects.filter(object => object.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
