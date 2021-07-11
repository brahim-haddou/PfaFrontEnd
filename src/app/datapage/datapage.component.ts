import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from '../side-nav.service';
import {MatDialog} from '@angular/material/dialog';
import { StartformComponent } from '../startform/startform.component';
import {LoginCardService} from '../logincard/logincard.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-datapage',
  templateUrl: './datapage.component.html',
  styleUrls: ['./datapage.component.css']
})
export class DatapageComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav')
  public sidenav!: MatSidenav;

  // tslint:disable-next-line:max-line-length
  constructor(private loginCardService: LoginCardService, private router: Router, private sideNavService: SideNavService, public dialog: MatDialog) {
    if (!loginCardService.isLoggedIn()) {
      router.navigate(['/']);
    }
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

