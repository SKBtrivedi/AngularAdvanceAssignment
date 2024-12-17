import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable((observer) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          observer.next(true);
        } else {
          alert('You must be logged in to access this page. Please log in and try again.');
          this.router.navigate(['/login']);
          observer.next(false);
        }
        observer.complete();
      });
    });
  }
}
