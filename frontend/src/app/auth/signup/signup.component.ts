import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Validation from '../../utils/validation';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  public submitted = false;
  public errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }


  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if (this.signupForm.invalid) {
      console.log("form is invalid");
      
      return;
    }

    const user = new User();
    user.first_name = this.signupForm.get('firstname')?.value;
    user.last_name = this.signupForm.get('lastname')?.value;
    user.username = this.signupForm.get('username')?.value;
    user.email = this.signupForm.get('email')?.value;
    user.password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    
    this.authService.createNewUser(user).then(
      () => {
        this.signupForm.reset();
        this.router.navigate(['/connexion']);
      }
    ).catch(
      (error: string) => {
        this.errorMessage = error;
      }
    );
  }

  onReset(): void {
    this.submitted = false;
    this.signupForm.reset();
  }
}