import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  newUser: User = new User();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  checkLogin(): boolean {
    return this.auth.checkLogin();
  }

  login(loginForm: NgForm) {
    console.log(loginForm.value.username);
    console.log(loginForm.value.password);
    this.auth.login(loginForm.value.username, loginForm.value.password).subscribe(
      data => {
        console.log('LoginComponent.login(): user logged in, routing to /home.');
        this.router.navigateByUrl('photoshoots');
      },
      err => {
        console.error('NavbarComponent.login(): error logging in.');
        console.error(err);
      }
    );
  }

  register() {
    this.auth.register(this.newUser).subscribe(
      data => {
        console.log('NavbarComponent.register(): user logged in, routing to /home.');
        this.router.navigateByUrl('home');
        this.newUser = new User();
      },
      err => {
        console.error('NavbarComponent.register(): error logging in.');
        console.error(err);
      }
    );
  }

  logout() {
    this.auth.logout();
  }

}
