import { Component } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isLoggedIn: boolean = false;
  userProfilePic: string | null = null;
  userName: string | null = null;

  constructor(private auth: Auth, private router: Router) {
    this.auth.onAuthStateChanged((user: User | null) => {
      this.isLoggedIn = !!user;
      if (user) {
        this.userProfilePic = user.photoURL;
        this.userName = user.displayName || 'User';
      } else {
        this.userProfilePic = null;
        this.userName = null;
      }
    });
  }

  logout() {
    this.auth.signOut().then(() => this.router.navigate(['/login']));
  }
}
