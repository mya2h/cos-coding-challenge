import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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
    Validators.email,
  ])
})

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logIn(){
    console.log("sdkf",this.userInfo.value)
    this.router.navigate(["/vehicle"])
  }

}
