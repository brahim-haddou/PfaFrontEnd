import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoginCardService} from './logincard/logincard.service';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {LoginResponse} from './logincard/login-response-payload';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private loginCardService: LoginCardService){
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = this.loginCardService.getJwtToken();
    if (jwtToken) {
      this.addToken(req, jwtToken);
    }
    // @ts-ignore
    return next.handle(req).pipe( catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 403){
        return this.handleAuthErrors(req, next);
      } else {
        return throwError(error);
      }
    }));
  }
  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.loginCardService.refreshToken().pipe(
        switchMap((refreshTokenResponse: LoginResponse) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject
            .next(refreshTokenResponse.authenticationToken);
          return next.handle(this.addToken(req,
            refreshTokenResponse.authenticationToken));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap(() => {
          return next.handle(this.addToken(req,
            this.loginCardService.getJwtToken()));
        })
      );
    }
  }
  // tslint:disable-next-line:typedef
  addToken(req: HttpRequest<any>, jwtToken: any){
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
    });
  }
}
