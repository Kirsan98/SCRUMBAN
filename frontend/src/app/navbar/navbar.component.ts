import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogged: boolean = false;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isLogged.subscribe(
      (isLogged: boolean) => {
        this.isLogged = isLogged;
      }
    );
    // this.isLog();
  }

  // isLog() {    
  //   if (this.authService.isLoggedIn() == true)
  //     this.isLogged = true;
  // }
}
