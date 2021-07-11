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

  listFIliere!: Filiere[];
  public show = true;

  // @ts-ignore
  constructor(private datafiliereService: DatafiliereService, private loginCardService: LoginCardService, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllFilieres();
  }

  reload() {
    this.show = false;
    setTimeout(() => this.show = true);
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

  // tslint:disable-next-line:typedef
  logout(){
    this.loginCardService.logout();
    this.router.navigate(['/']);
    this.toastr.success('You Are Logged out');
  }
}
