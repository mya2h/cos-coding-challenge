import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 userInfo = new FormGroup({
  email:new FormControl('', [
    Validators.required,
    Validators.email,
  ]),
  password:new FormControl('',
  [
    Validators.required,
  ])
})
isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';  

 constructor(private router: Router,private authService: AuthService, private tokenStorage: TokenStorageService) { }
  ngOnInit(): void {
  }
  logIn(){
    const { email, password } = this.userInfo.value;
    this.authService.login(email, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUserId(data.userId);
        this.tokenStorage.saveUser(data)
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(["/vehicle"])
    },
      err => {
        this.errorMessage = "Unauthorized user ";
        console.log(this.errorMessage)
        this.isLoginFailed = true;
      }
    );
  }

}
