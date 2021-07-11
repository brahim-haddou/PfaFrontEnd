import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LogincardComponent } from '../logincard/logincard.component';
import {LoginCardService} from '../logincard/logincard.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{


  public show = false;
  constructor(public dialog: MatDialog, private loginCardService: LoginCardService) {}
  // tslint:disable-next-line:typedef
  openLoginDialog() {
    this.dialog.open(LogincardComponent);
  }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  // tslint:disable-next-line:typedef
  isLoggedIn(){
    this.show = this.loginCardService.isLoggedIn();
  }

}
