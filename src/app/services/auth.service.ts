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

  currentUser = this.cooki.get('user') ? JSON.parse(this.cooki.get('user')) : {};
  user = new BehaviorSubject<User>(this.currentUser);


  login(displayName: string, password: string):Observable<boolean> {
    return this.http.get<User[]>('assets/JSON/users.json').pipe(
      map((users) => {
        const user = users.find(
          (u) => u.displayName === displayName && u.password === password
        );

        if (user) {
          this.cooki.set('user', JSON.stringify(user));
          this.user.next(user);
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
      .post<User[]>('assets/JSON/users.json', formData)
      .pipe(
        map(() => {
          this.cooki.set('user', JSON.stringify(formData));
          this.user.next(formData as unknown as User);
          return true;
        }),
        catchError(() => of(false))
      );
  }
}
