import { Component, OnInit,  ChangeDetectorRef} from '@angular/core';
import { Prof } from '../DBModels/prof.model';
import { SideNavService } from '../side-nav.service';
import {MatDialog} from '@angular/material/dialog';
import { AddprofComponent } from '../addprof/addprof.component';
import {HttpErrorResponse} from '@angular/common/http';
import { DetailprofComponent } from '../detailprof/detailprof.component';
import {DataprofService} from './dataprof.service';
import {LoginCardService} from '../logincard/logincard.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dataprof',
  templateUrl: './dataprof.component.html',
  styleUrls: ['../datalist.css']
})
export class DataprofComponent implements OnInit {

  elementList: Prof[];
  public show = true;

  searchText!: string;

  constructor(private loginCardService: LoginCardService, private router: Router, private dataprofService: DataprofService, private sideNavService: SideNavService, public dialog: MatDialog, private cdr: ChangeDetectorRef) {
    if (!loginCardService.isLoggedIn()) {
      router.navigate(['/']);
    }
    this.elementList = [] ;
   }

  ngOnInit(): void {
    this.getAllProfesseurs();
  }

  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }

  openFormDialog(){
    const dialog = this.dialog.open(AddprofComponent);
    dialog.afterClosed().subscribe(() => {
      this.getAllProfesseurs();
      this.reload();
  });
  }

  openDetailDialog(prof: Prof){
    const dialog = this.dialog.open(DetailprofComponent , {
      data: { prof },
    });
    dialog.afterClosed().subscribe(() => {
      this.getAllProfesseurs();
      this.reload();
  });
  }

  delElement(p: Prof){
    const index = this.elementList.indexOf(p);
    this.dataprofService.deleteProfesseur(p).subscribe();
    delete this.elementList[index];
    this.elementList.splice(index, 1);
    this.reload();
  }


  clickMenu() {
    this.sideNavService.toggle();
  }

 public getAllProfesseurs(){
    this.elementList = [] ;
    this.dataprofService.getAllProfesseurs().subscribe(
        (response: Prof[]) => {
          this.elementList = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    for (let i = 0; i < this.elementList.length; i++) {
      if (this.elementList[i].id == 0) {
        delete this.elementList[i];
        this.elementList.splice(i,1);
      }
    }
    this.reload();
  }
}
