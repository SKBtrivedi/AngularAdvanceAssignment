import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn: boolean = false;

  constructor(private auth: Auth, private router: Router) {
    this.auth.onAuthStateChanged((user) => {
      this.isLoggedIn = !!user;
    });
  }

  logout() {
    this.auth.signOut().then(() => this.router.navigate(['/login']));
  }
}
