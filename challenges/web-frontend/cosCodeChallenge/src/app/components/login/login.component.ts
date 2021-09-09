import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,AbstractControl, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
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
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;

 constructor(private toastrService: ToastrService,private router: Router,private authService: AuthService, private tokenStorage: TokenStorageService) { }
  ngOnInit(): void {
  }

  logIn(){
    const { email, password } = this.userInfo.value;
    this.authService.login(email, password).subscribe(
      data => {
        if(data.privileges.includes("SALESMAN_USER")){
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUserId(data.userId);
          this.tokenStorage.saveUser(data)
          this.router.navigate(["/vehicle"])
        }
        else{
          this.toastrService.error("Unauthorized user ", 'Error',
          {timeOut: 2000});
        }      
    },
      err => {
        this.toastrService.error("Unauthorized user ", 'Error',
        {timeOut: 2000});
      }
    );
  }
}


