import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {DatafiliereService} from '../datafiliere/datafiliere.service';
import { Filiere } from '../DBModels/filiere.model';
import {LoginCardService} from '../logincard/logincard.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
@Component({
  selector: 'app-logged-in-toolbar',
  templateUrl: './logged-in-toolbar.component.html',
  styleUrls: ['./logged-in-toolbar.component.css']
})
export class LoggedInToolbarComponent implements OnInit {

  // @ts-ignore
  // tslint:disable-next-line:max-line-length
  constructor(private datafiliereService: DatafiliereService, private loginCardService: LoginCardService, private router: Router, private toastr: ToastrService) { }

  listFIliere!: Filiere[];
  public show = true;

  // tslint:disable-next-line:typedef
  expand: boolean = false;

  ngOnInit(): void {
    this.getAllFilieres();
  }

  reload() {
    this.show = true;
    setTimeout(() => this.show = true);
  }
  closeExpand(id: number | undefined): void {
    this.router.navigate([`build/${Number(id)}`]);
    this.expand = false;
  }

  public getAllFilieres(){
    this.listFIliere = [] ;
    this.datafiliereService.getAllFilieres().subscribe(
        (response: Filiere[]) => {
          this.listFIliere = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }
  logout(){
    this.loginCardService.logout();
    this.toastr.success('You Are Logged out');
    this.router.navigate(['/']);
    location.reload();
  }
}
