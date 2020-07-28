import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterialService } from '../../classes/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('floating') floatingRef: ElementRef

  links = [
    {url: '/overview', name: 'Overview'},
    {url: '/analytics', name: 'Analytics'},
    {url: '/history', name: 'History'},
    {url: '/order', name: 'Add order'},
    {url: '/categories', name: 'Assortment'},
  ]
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.floatingRef)
  }


  logout(event: Event) {
    event.preventDefault()
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
