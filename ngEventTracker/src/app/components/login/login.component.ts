import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(loginForm: NgForm) {
    this.auth.login(loginForm.value.username, loginForm.value.password).subscribe(
      data => {
        console.log('LoginComponent.login(): user logged in, routing to /home.');
        this.router.navigateByUrl('home');
      },
      err => {
        console.error('LoginComponent.login(): error logging in.');
        console.error(err);
      }
    );
  }

}
