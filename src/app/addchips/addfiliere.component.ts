import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Filiere } from '../DBModels/filiere.model';

@Component({
  selector: 'app-addfiliere',
  templateUrl: './addfiliere.component.html',
  styleUrls: ['./addfiliere.component.css']
})
export class AddfiliereComponent {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  objectCtrl = new FormControl();
  filteredobjects: Observable<Filiere[]>;
  objects: Filiere[] = [{id : 0 , nom : 'Filiere'}];
  allobjects: Filiere[] = [
    {id : 0 , nom : 'Filiere'},
    {id : 0 , nom : 'Filiere'},
    {id : 0 , nom : 'Filiere'}
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
      this.objects.push({id : 0 , nom : 'Filiere'});
    }

    // Clear the input value
    this.objectCtrl.reset;

    this.objectCtrl.setValue(null);
  }

  remove(object: Filiere): void {
    const index = this.objects.indexOf(object);

    if (index >= 0) {
      this.objects.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.objects.push({id : 0 , nom : 'Filiere'});
    this.objectInput.nativeElement.value = '';
    this.objectCtrl.setValue(null);
  }

  private _filter(value: string): Filiere[] {
    const filterValue = value.toLowerCase();

    return this.allobjects.filter(object => object.nom.toLowerCase().indexOf(filterValue) === 0);
  }
}
