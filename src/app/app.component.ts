import { Component, OnInit } from '@angular/core';
import { authService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'shoppingCart';

  constructor(private authService: authService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
