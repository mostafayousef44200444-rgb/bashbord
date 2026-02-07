import { Component } from '@angular/core';
import { SidebarService } from '../../services/service-navbar.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // مهم لبعض الخصائص

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule], // أضف هذا إذا كنت تستخدم *ngIf
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isSearchVisible = false; // متغير للتحكم في ظهور البحث بالموبايل

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    private router: Router
  ) {}

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  // دالة لفتح وإغلاق البحث في الموبايل
  toggleMobileSearch(): void {
    this.isSearchVisible = !this.isSearchVisible;
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}