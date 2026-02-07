import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NavbarsidComponent } from '../../navbarsid/navbarsid.component';
import { SidebarService } from '../../../services/service-navbar.service'; 

import { CommonModule } from '@angular/common'; // مهم جداً

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NavbarsidComponent, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  isOpen = true;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.isOpen$.subscribe(v => this.isOpen = v);
  }

  // دالة لإغلاق السايدبار عند الضغط على الـ Overlay في الموبايل
  toggleSidebar() {
    // يمكنك استدعاء دالة من الـ service هنا لإغلاقه
    // this.sidebarService.toggle(); 
  }
}