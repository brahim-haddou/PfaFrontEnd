import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Classe } from '../DBModels/classe.model';
import { SideNavService } from '../side-nav.service';
import {HttpErrorResponse} from '@angular/common/http';
import {DataElementService} from '../dataelement/dataelement.service';
import {DataClasseService} from './dataclasse.service';
import { MatDialog } from '@angular/material/dialog';
import { AddclasseComponent } from '../addclasse/addclasse.component';
import { DetailclasseComponent } from '../detailclasse/detailclasse.component';
import {LoginCardService} from '../logincard/logincard.service';
import {BuildpageService} from '../buildpage/buildpage.service';

@Component({
  selector: 'app-dataclasse',
  templateUrl: './dataclasse.component.html',
  styleUrls: ['../datalist.css']
})
export class DataclasseComponent implements OnInit {

  elementList: Classe[];
  public show = true;
  searchText!: string;

  dataId!: number;
  constructor(private loginCardService: LoginCardService, private router: Router, private dataclasseservice: DataClasseService, private dataElementService: DataElementService,private sideNavService: SideNavService, private activatedRoute: ActivatedRoute,  public dialog: MatDialog) {
    if (!loginCardService.isLoggedIn()) {
      router.navigate(['/']);
    }
    this.elementList = [];
  }

  ngOnInit(): void {
    this.dataId = this.activatedRoute.snapshot.params['id'];
    this.getElementClasse();
  }

  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
  }

  openFormDialog(){
    const dataId = this.dataId;
    const dialog = this.dialog.open(AddclasseComponent, {
      data: { dataId },
    });
    dialog.afterClosed().subscribe(() => {
      this.getElementClasse();
      this.reload();
    });
  }

  openDetailDialog(classe : Classe){
    const dataId = this.dataId;
    const dialog = this.dialog.open(DetailclasseComponent , {
      data: { classe, dataId },
    });
    dialog.afterClosed().subscribe(() => {
      this.getElementClasse();
      this.reload();
    });
  }

  delElement(p: Classe) {
    const index = this.elementList.indexOf(p);
    this.dataclasseservice.deleteClasse(p).subscribe();
    delete this.elementList[index];
    this.elementList.splice(index, 1);
    this.reload();
  }

  clickMenu() {
    this.sideNavService.toggle();
  }

  public getElementClasse(){
    this.elementList = [];
    this.dataElementService.getElementClasses(this.dataId).subscribe(
        (response: Classe[]) => {
          this.elementList = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      this.reload();
  }

}
