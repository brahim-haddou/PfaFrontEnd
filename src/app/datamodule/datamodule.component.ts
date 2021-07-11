import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Module } from '../DBModels/module.model';
import { SideNavService } from '../side-nav.service';
import {MatDialog} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {DatafiliereService} from '../datafiliere/datafiliere.service';
import {DataModuleService} from './datamodule.service';
import { AddmoduleComponent } from '../addmodule/addmodule.component';
import { DetailmoduleComponent } from '../detailmodule/detailmodule.component';
import {LoginCardService} from '../logincard/logincard.service';

@Component({
  selector: 'app-datamodule',
  templateUrl: './datamodule.component.html',
  styleUrls: ['../datalist.css']
})
export class DatamoduleComponent implements OnInit {

  elementList: Module[];
  public show = true;
  searchText!: string;

  dataId!: number;

  constructor(private loginCardService: LoginCardService, private router: Router, private datamoduleService: DataModuleService, private datafiliereService: DatafiliereService,private sideNavService: SideNavService, private activatedRoute: ActivatedRoute,  public dialog: MatDialog) {
    if (!loginCardService.isLoggedIn()) {
      router.navigate(['/']);
    }
    this.elementList = [];
   }

  ngOnInit(): void {
    this.dataId = this.activatedRoute.snapshot.params['id'];
    this.getFiliereModules();
  }

  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }

  openFormDialog(){
    const dataId = this.dataId
    const dialog = this.dialog.open(AddmoduleComponent, {
      data: { dataId },
    });
    dialog.afterClosed().subscribe(() => {
      this.getFiliereModules();
      this.reload();
    });
  }

  openDetailDialog(module: Module){
    const dialog = this.dialog.open(DetailmoduleComponent , {
      data: { module },
    });
    dialog.afterClosed().subscribe(() => {
      this.getFiliereModules();
      this.reload();
    });
  }

  delElement(p: Module) {
    const index = this.elementList.indexOf(p);
    this.datamoduleService.deleteModule(p).subscribe();
    delete this.elementList[index];
    this.elementList.splice(index, 1);
    this.reload();
  }


  clickMenu() {
    this.sideNavService.toggle();
  }

  public getFiliereModules(){
    this.elementList = [] ;
    this.datafiliereService.getFiliereModules(this.dataId).subscribe(
        (response: Module[]) => {
          this.elementList = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      this.reload();
  }


}
