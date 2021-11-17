import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  
  constructor(  ) {

   }

  ngOnInit(): void {
  }

}
