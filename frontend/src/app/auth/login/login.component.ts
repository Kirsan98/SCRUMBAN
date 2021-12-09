import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage!: string;
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    )
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }


  onLogin() {
    if(this.loginForm.invalid){
      console.log("form is invalid");
      return; 
    }
   
    let userDataLogin = { "email":null, "password":null };
    userDataLogin.email = this.loginForm.get('email')?.value;
    userDataLogin.password = this.loginForm.get('password')?.value;
    
    this.authService.loginUser(userDataLogin).then(
    (response) => {
      console.log(response);
      if(response==false){
        this.router.navigate(['/connexion']);
        console.log(response);
      }
      this.router.navigate(['/accueil']);
    }
    ).catch(
      (error: string) => {
        this.errorMessage = error;
      }
    );
  }
}
