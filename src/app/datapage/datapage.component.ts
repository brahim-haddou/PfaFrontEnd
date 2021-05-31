import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from '../side-nav.service';
import {MatDialog} from '@angular/material/dialog';
import { StartformComponent } from '../startform/startform.component';

@Component({
  selector: 'app-datapage',
  templateUrl: './datapage.component.html',
  styleUrls: ['./datapage.component.css']
})
export class DatapageComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav')
  public sidenav!: MatSidenav;

  constructor(private sideNavService: SideNavService, public dialog: MatDialog) { 
  }

  openLoginDialog() {
    this.dialog.open(StartformComponent);
  }

  open() {
    this.sidenav.toggle();
  }

  ngAfterViewInit() {
    this.sideNavService.setSidenav(this.sidenav);
  }

  ngOnInit() { 
    this.sideNavService.setSidenav(this.sidenav);
  } 
  
}

