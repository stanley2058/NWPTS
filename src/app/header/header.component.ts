import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  hasLogin: boolean

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(nav: string) {
    this.router.navigate([nav]);
  }

  logout() {

  }
}
