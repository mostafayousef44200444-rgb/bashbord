import { Component } from '@angular/core';
import { SidebarService } from '../../services/service-navbar.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {  RouterLinkActive } from '@angular/router'; // أضف RouterLinkActive هنا
@Component({
  selector: 'app-navbarsid',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterLinkActive],
  templateUrl: './navbarsid.component.html',
  styleUrl: './navbarsid.component.css'
})
export class NavbarsidComponent {
  isOpen = true;

  navItems = [
    { path: '/', label: 'Dashboard', icon: 'bi bi-grid-1x2' },
    { path: '/product', label: 'Products', icon: 'bi bi-box-seam' },
    { path: '/order', label: 'Orders', icon: 'bi bi-cart-check' },
    { path: '/users', label: 'Users', icon: 'bi bi-people' },
    { path: '/contact', label: 'Contact', icon: 'bi bi-telephone' }
  ];

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.isOpen$.subscribe(v => this.isOpen = v);
  }
}