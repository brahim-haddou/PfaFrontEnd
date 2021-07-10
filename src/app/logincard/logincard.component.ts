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

  signupRequestPayload: SignupRequestPayload;
  loginRequestPayload: LoginRequestPayload;
  // loginResponse: LoginResponse;
  constructor(private loginCardService: LoginCardService, private router: Router, private toastr: ToastrService) {
    this.signupRequestPayload = {
      firstName: 'test',
      lastName: 'test',
      username: 'test',
      email: 'test@test.com',
      password: 'test'
    };
    this.loginRequestPayload = {
      username: 'test',
      password: 'test'
    };
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  signup() {
    this.loginCardService.signup(this.signupRequestPayload).subscribe(
      data => {
      console.log(data);
      this.toastr.success('SignUp Successful! Please Check Your Email To Activate Your Account');
    },
    error => {
      console.log(error);
      this.toastr.error('SignUp Failed! Please Try Again');
    });
  }


  // tslint:disable-next-line:typedef
  login() {
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
  }
}
