import { Component, OnInit,  ChangeDetectorRef} from '@angular/core';
import { Salle } from '../DBModels/salle.model';
import { SideNavService } from '../side-nav.service';
import {MatDialog} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import { AddsalleComponent } from '../addsalle/addsalle.component';
import { DetailsalleComponent } from '../detailsalle/detailsalle.component';
import {DatasalleService} from './datasalle.service';
import {LoginCardService} from '../logincard/logincard.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-datasalle',
  templateUrl: './datasalle.component.html',
  styleUrls: ['../datalist.css']
})
export class DatasalleComponent implements OnInit {

  elementList: Salle[];
  public show = true;

  searchText!: string;

  constructor(private loginCardService: LoginCardService, private router: Router, private datasalleService: DatasalleService, private sideNavService: SideNavService, public dialog: MatDialog, private cdr: ChangeDetectorRef) {
    if (!loginCardService.isLoggedIn()) {
      router.navigate(['/']);
    }
    this.elementList = [] ;
   }

  ngOnInit(): void {
    this.getAllSalles();


    this.elementList.forEach(element => {
      const index = this.elementList.indexOf(element);
      if (this.elementList[index].id == 0) {
        delete this.elementList[index];
        this.elementList.splice(index, 1);
      }
    });
  }

  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }

  openFormDialog(){
    const dialog = this.dialog.open(AddsalleComponent);
    dialog.afterClosed().subscribe(() => {
      this.getAllSalles();
      this.reload();
  });
  }

  openDetailDialog(salle: Salle){
    const dialog = this.dialog.open(DetailsalleComponent , {
      data: { salle },
    });
    dialog.afterClosed().subscribe(() => {
      this.getAllSalles();
      this.reload();
  });
  }

  delElement(p: Salle){
    const index = this.elementList.indexOf(p);
    this.datasalleService.deleteSalle(p).subscribe();
    delete this.elementList[index];
    this.elementList.splice(index, 1);
    this.reload();
  }

  clickMenu() {
    this.sideNavService.toggle();
  }

  public getAllSalles(){
    this.elementList = [] ;
    this.datasalleService.getAllSalles().subscribe(
        (response: Salle[]) => {
          this.elementList = response;
        },
        (error: HttpErrorResponse) => {
          //alert(error.message);
        }
    );
    /*for (let i = 0; i < this.elementList.length; i++) {
      if (this.elementList[i].nom == null) {
        delete this.elementList[i];
        this.elementList.splice(i-1,1);
      }
    }*/
    this.reload();
  }

}
