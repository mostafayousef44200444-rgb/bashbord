// src/app/component/layouts/admin-layout/admin-layout.component.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NavbarsidComponent } from '../../navbarsid/navbarsid.component';
import { SidebarService } from '../../../services/service-navbar.service'; 
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs'; // أضف هذا الاستيراد

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NavbarsidComponent, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  // تعريف المتغير كـ Observable ليتوافق مع الـ async pipe في HTML
  isOpen$: Observable<boolean>;

  constructor(private sidebarService: SidebarService) {
    // ربط المتغير مباشرة بالـ Service
    this.isOpen$ = this.sidebarService.isOpen$;
  }

  // إضافة الدالة التي كانت مفقودة وتسببت في الخطأ
  closeSidebar() {
    this.sidebarService.close(); // تأكد أن دالة close موجودة في الـ Service
  }
}