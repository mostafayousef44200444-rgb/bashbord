import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// service-navbar.service.ts
export class SidebarService {
  private isOpen = new BehaviorSubject<boolean>(window.innerWidth > 992); // يبدأ مفتوح فقط في الشاشات الكبيرة
  isOpen$ = this.isOpen.asObservable();

  toggle() {
    this.isOpen.next(!this.isOpen.value);
  }

  close() {
    this.isOpen.next(false);
  }
}