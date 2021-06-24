import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Prof } from '../DBModels/prof.model';

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
  filteredobjects: Observable<Prof[]>;
  objects: Prof[] = [{id : 0 , nom : 'Prof', isSelected : {completed: false}}];
  allobjects: Prof[] = [
    {id : 0 , nom : 'Prof', isSelected : {completed: false}},
    {id : 0 , nom : 'Prof', isSelected : {completed: false}},
    {id : 0 , nom : 'Prof', isSelected : {completed: false}}
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
      this.objects.push({id : 0 , nom : 'Prof', isSelected : {completed: false}});
    }

    // Clear the input value
    this.objectCtrl.reset;

    this.objectCtrl.setValue(null);
  }

  remove(object: Prof): void {
    const index = this.objects.indexOf(object);

    if (index >= 0) {
      this.objects.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.objects.push({id : 0 , nom : 'Prof',  isSelected : {completed: false}});
    this.objectInput.nativeElement.value = '';
    this.objectCtrl.setValue(null);
  }

  private _filter(value: string): Prof[] {
    const filterValue = value.toLowerCase();

    return this.allobjects.filter(object => object.nom.toLowerCase().indexOf(filterValue) === 0);
  }
}
