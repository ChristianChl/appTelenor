import { LocationStrategy } from '@angular/common';
import {Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthService,
    private Location: LocationStrategy) {}


  get usuario(){
    return this.authService.usuario;
  } 


  
  ngOnInit(): void {

    history.pushState(null, '', window.location.href);
    this.Location.onPopState(() => {
    history.pushState(null, '', window.location.href);
    });

  }

  logout(){

    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  showSubmenu1: boolean = false;
  showSubmenuMaestro: boolean = false;
  showSubmenu2: boolean = false;
  showSubmenu3: boolean = false;
  showSubmenu4: boolean = false;
  showSubmenu5: boolean = false;


  mouseenter() {
    if (!this.isExpanded) {
        this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
        this.isShowing = false;
    }
  }
  
}
