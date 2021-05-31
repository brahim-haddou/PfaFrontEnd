import { Component, OnInit } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-startform',
  templateUrl: './startform.component.html',
  styleUrls: ['./startform.component.css']
})
export class StartformComponent implements OnInit {

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
