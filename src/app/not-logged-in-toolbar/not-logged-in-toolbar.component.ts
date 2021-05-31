import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LogincardComponent } from '../logincard/logincard.component';

@Component({
  selector: 'app-not-logged-in-toolbar',
  templateUrl: './not-logged-in-toolbar.component.html',
  styleUrls: ['./not-logged-in-toolbar.component.css']
})
export class NotLoggedInToolbarComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  openLoginDialog() {
    this.dialog.open(LogincardComponent);
  }

  ngOnInit(): void {
  }

}
