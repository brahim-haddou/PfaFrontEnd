import { Component, OnInit } from '@angular/core';
import { Filiere } from '../DBModels/filiere.model';
import { SideNavService } from '../side-nav.service';
import {MatDialog} from '@angular/material/dialog';
import { AddfiliereComponent } from '../addfiliere/addfiliere.component';
import { DetailfiliereComponent } from '../detailfiliere/detailfiliere.component'; 
import {HttpErrorResponse} from '@angular/common/http';
import {DatafiliereService} from './datafiliere.service';

@Component({
  selector: 'app-datafiliere',
  templateUrl: './datafiliere.component.html',
  styleUrls: ['../datalist.css']
})
export class DatafiliereComponent implements OnInit {

  elementList: Filiere[];
  public show = true;

  searchText!: string;

  constructor(private datafiliereService: DatafiliereService, private sideNavService: SideNavService, public dialog: MatDialog) {
    this.elementList = [] ;
   }

  ngOnInit(): void {
    this.getAllFilieres();
  }

  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }


  openFormDialog(){  
    const dialog = this.dialog.open(AddfiliereComponent);
    dialog.afterClosed().subscribe(() => {
      this.getAllFilieres();
      this.reload();
    });
  }

  openDetailDialog(filiere : Filiere){
    const dialog = this.dialog.open(DetailfiliereComponent , {
      data: { filiere },
    });
    dialog.afterClosed().subscribe(() => {
      this.getAllFilieres();
      this.reload();
    });
  }

  delElement(p: Filiere){
    const index = this.elementList.indexOf(p);
    this.datafiliereService.deleteFiliere(p).subscribe();
    delete this.elementList[index];
    this.elementList.splice(index, 1);
    this.reload();
  }

  clickMenu() {
    this.sideNavService.toggle();
  }

  public getAllFilieres(){
    this.elementList = [] ;
    this.datafiliereService.getAllFilieres().subscribe(
        (response: Filiere[]) => {
          this.elementList = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      this.reload();
  }
}
