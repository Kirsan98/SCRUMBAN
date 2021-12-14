import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let res: boolean = false;
    this.authService.isLogged.subscribe(
      (isLogged: boolean) => {
        if (isLogged) {
          console.log("on est connecté");
          res = true;
        }
        else {
          this.router.navigate(['/connexion']);
          res = false;
        }
      }
    );
    console.log(res, "on affiche le resultat de can activate");
    
    return res;
  }

}
