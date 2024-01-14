import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, catchError, of, Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient); // inject http client
  private cooki = inject(CookieService); // inject cookie service

  currentUser = this.cooki.get('user') ? JSON.parse(this.cooki.get('user')) : {}; // get user from cookie service or empty object
  user = new BehaviorSubject<User>(this.currentUser); // user observable


  login(displayName: string, password: string):Observable<boolean> {
    return this.http.get<User[]>('assets/JSON/users.json').pipe( // get users from json file
      map((users) => {
        const user = users.find(
          (u) => u.displayName === displayName && u.password === password
        );

        if (user) {
          this.cooki.set('user', JSON.stringify(user));   // store user in cookie
          this.user.next(user); // update user observable
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => of(false))
    );
   }

  signup(formData: FormData) {
    return this.http
      .post<User[]>('assets/JSON/users.json', formData) // post user to json file
      .pipe(
        map(() => {
          this.cooki.set('user', JSON.stringify(formData)); // store user in cookie
          this.user.next(formData as unknown as User);
          return true;
        }),
        catchError(() => of(false))
      );
  }
}
