import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Photoshoot } from './../models/photoshoot';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoshootService {

  // F I E L D S

  private baseUrl = 'http://localhost:8090/';
  private url = this.baseUrl + 'api/users/annie@es/photoshoots';

  photoshoots: Photoshoot[] = [];

  // C O N S T R U C T O R

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  // M E T H O D S

  index() {
    // if (!this.authService.checkLogin()) {
    //   return null;
    // }

    // Make credentials
    const credentials = this.authService.getCredentials();
    // const credentials = 'dW5kZWZpbmVkOnVuZGVmaW5lZA==';
    // Send credentials as Authorization header (this is spring security convention for basic auth)
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    // this.checkLogin();
    return this.http.get<Photoshoot[]>(this.url, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
      );
  }

  checkLogin(): boolean {
    if (this.authService.getCredentials() === null) {
      this.router.navigateByUrl('login');
      return false;
    } else {
      this.router.navigateByUrl('photoshoots');
      return true;
    }
  }

  create(newPhotoshoot: Photoshoot) {

    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http.post<Photoshoot>(this.url, newPhotoshoot, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Could not add Photoshoot');
        })
      );
  }

  updatePhotoshoot(photoshoot: Photoshoot) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http.put(this.url + '/' + photoshoot.id, photoshoot, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Could not update Photoshoot');
        })
      );
  }

  delete(id: number) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };

    return this.http.delete(this.url + '/' + id, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('Could not delete Photoshoot');
        })
      );

  }

}
