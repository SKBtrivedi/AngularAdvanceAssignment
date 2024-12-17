import { Component } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: Auth, private router: Router) {}

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then(() => this.router.navigate(['/']))
      .catch((error) => console.error(error));
  }

  loginWithGitHub() {
    const provider = new GithubAuthProvider();
    signInWithPopup(this.auth, provider)
      .then(() => this.router.navigate(['/']))
      .catch((error) => console.error(error));
  }

}
