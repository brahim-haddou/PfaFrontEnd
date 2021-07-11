import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Element } from '../DBModels/element.model';
import { SideNavService } from '../side-nav.service';
import {HttpErrorResponse} from '@angular/common/http';
import {DataElementService} from './dataelement.service';
import {DataModuleService} from '../datamodule/datamodule.service';
import { AddelementComponent } from '../addelement/addelement.component';
import { DetailelementComponent } from '../detailelement/detailelement.component';
import { MatDialog } from '@angular/material/dialog';
import {LoginCardService} from '../logincard/logincard.service';
import {DataClasseService} from '../dataclasse/dataclasse.service';

@Component({
  selector: 'app-dataelement',
  templateUrl: './dataelement.component.html',
  styleUrls: ['../datalist.css']
})
export class DataelementComponent implements OnInit {

  elementList: Element[];
  public show = true;
  searchText!: string;

  dataId!: number;

  constructor(private loginCardService: LoginCardService, private router: Router,private datamoduleService: DataModuleService, private dataElementService: DataElementService,private sideNavService: SideNavService, private activatedRoute: ActivatedRoute,  public dialog: MatDialog) {
    if (!loginCardService.isLoggedIn()) {
      router.navigate(['/']);
    }
    this.elementList = [];
  }

  ngOnInit(): void {
    this.dataId = this.activatedRoute.snapshot.params['id'];
    this.getModuleElement();
  }

  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }

  openFormDialog(){
    const dataId = this.dataId;
    const dialog = this.dialog.open(AddelementComponent, {
      data: { dataId },
    });
    dialog.afterClosed().subscribe(() => {
      this.getModuleElement();
      this.reload();
    });
  }

  openDetailDialog(element: Element){
    const dataId = this.dataId;
    const dialog = this.dialog.open(DetailelementComponent , {
      data: { element,  dataId },
    });
    dialog.afterClosed().subscribe(() => {
      this.getModuleElement();
      this.reload();
    });
  }

  delElement(p: Element) {
    const index = this.elementList.indexOf(p);
    this.dataElementService.deleteElement(p).subscribe();
    delete this.elementList[index];
    this.elementList.splice(index, 1);
    this.reload();
  }

  clickMenu() {
    this.sideNavService.toggle();
  }

  public getModuleElement(){
    this.elementList = [];
    this.datamoduleService.getModuleElements(this.dataId).subscribe(
        (response: Element[]) => {
          this.elementList = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      this.reload();
  }

}
