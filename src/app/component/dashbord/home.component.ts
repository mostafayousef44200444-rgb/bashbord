import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule, NgFor, NgClass } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  standalone: true, // تأكد أنه Standalone إذا كنت تستخدم إصدار حديث
  imports: [CommonModule, NgFor, NgClass],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  cards = [
    { title: 'Users', value: '1,200', icon: 'bi bi-people', color: '#4361ee' },
    { title: 'Sales', value: '540', icon: 'bi bi-cart3', color: '#4cc9f0' },
    { title: 'Revenue', value: '$12,300', icon: 'bi bi-cash-stack', color: '#4895ef' },
    { title: 'Orders', value: '320', icon: 'bi bi-box-seam', color: '#3f37c9' },
  ];

  recentOrders = [
    { customer: 'Alice Johnson', product: 'MacBook Pro', status: 'Completed', amount: '$1,200' },
    { customer: 'Bob Smith', product: 'iPhone 15', status: 'Pending', amount: '$899' },
    { customer: 'Charlie Brown', product: 'Apple Watch', status: 'Cancelled', amount: '$399' },
    { customer: 'Diana Prince', product: 'AirPods Max', status: 'Completed', amount: '$549' },
  ];

  recentActivity = [
    { user: 'Alice', action: 'purchased a Premium Plan', time: '2 min ago' },
    { user: 'System', action: 'Server rebooted successfully', time: '15 min ago' },
    { user: 'Bob', action: 'updated billing information', time: '1 hour ago' },
    { user: 'Charlie', action: 'requested a refund', time: '3 hours ago' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    // التأكد من أن الكود يعمل في المتصفح فقط وليس الـ SSR
    if (isPlatformBrowser(this.platformId)) {
      this.initSalesChart();
      this.initRevenueChart();
    }
  }

  private initSalesChart() {
    const canvas = document.getElementById('salesChart') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    // إنشاء تدرج لوني للخلفية
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(67, 97, 238, 0.2)');
    gradient.addColorStop(1, 'rgba(67, 97, 238, 0)');


  }

  private initRevenueChart() {
    const canvas = document.getElementById('revenueChart') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Direct', 'Affiliate', 'Ads'],
        datasets: [{
          data: [55, 25, 20],
          backgroundColor: ['#4361ee', '#4cc9f0', '#f72585'],
          borderWidth: 0,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        cutout: '75%', // لجعل الدونات أنحف وأرقى
        plugins: {
          legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } }
        }
      }
    });
  }
}