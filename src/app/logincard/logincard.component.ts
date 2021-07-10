import { Component, OnInit } from '@angular/core';
import {SignupRequestPayload} from './signup-request-payload';
import {LoginCardService} from './logincard.service';
import {LoginRequestPayload} from './login-request-payload';
import {LoginResponse} from './login-response-payload';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-logincard',
  templateUrl: './logincard.component.html',
  styleUrls: ['./logincard.component.css']
})
export class LogincardComponent implements OnInit {

  signupRequestPayload!: SignupRequestPayload;
  loginRequestPayload!: LoginRequestPayload;

  fNameSup!:string;
  lNameSup!:string;
  usernameSup!:string;
  emailSup!:string;
  passSup!:string;
  passconfSup!:string;

  usernameSin!:string;
  passSin!:string;

  selectedTab: number = 0;

  // loginResponse: LoginResponse;
  constructor(private loginCardService: LoginCardService, private router: Router, private toastr: ToastrService) {
    /*this.signupRequestPayload = {
      firstName: 'test',
      lastName: 'test',
      username: 'test',
      email: 'test@test.com',
      password: 'test'
    };
    this.loginRequestPayload = {
      username: 'test',
      password: 'test'
    };*/
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  signup() {
    if ((typeof this.fNameSup != 'undefined') &&
    (typeof this.lNameSup != 'undefined') &&
    (typeof this.usernameSup != 'undefined') &&
    (typeof this.emailSup != 'undefined') &&
    (typeof this.passSup != 'undefined') &&
    (typeof this.passconfSup != 'undefined') &&
    (this.passSup == this.passconfSup)) {
      this.signupRequestPayload = {
        firstName: this.fNameSup,
        lastName: this.lNameSup,
        username: this.usernameSup,
        email: this.emailSup,
        password: this.passSup
      };
      this.loginCardService.signup(this.signupRequestPayload).subscribe(
        data => {
        console.log(data);
        this.toastr.success('SignUp Successful! Please Check Your Email To Activate Your Account');
        this.selectedTab = 1;
      },
      error => {
        console.log(error);
        this.toastr.error('SignUp Failed! Please Try Again');
      });
    }else {
      this.toastr.error("Veuiller verifier vos informations")
    }
  }


  // tslint:disable-next-line:typedef
  login() {
    if ((typeof this.usernameSin != 'undefined') &&
    (typeof this.passSin != 'undefined')){

      this.loginRequestPayload = {
        username: this.usernameSin,
        password: this.passSin
      };

      this.loginCardService.login(this.loginRequestPayload).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/data']);
          this.toastr.success('Login Successful');
        },
        error => {
          console.log(error);
          this.router.navigate(['/']);
          this.toastr.error('Login Failed! Please Try Again');
        });
    }else{
      this.toastr.error("Veuiller remplir tout les champs")
    }
  }
}
