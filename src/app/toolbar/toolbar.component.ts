import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LogincardComponent } from '../logincard/logincard.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  constructor(public dialog: MatDialog) {}

  openLoginDialog() {
    this.dialog.open(LogincardComponent);
  }

}