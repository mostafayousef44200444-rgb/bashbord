import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
declare var bootstrap: any; // لاستخدام Modal

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: any[] = [];
  selectedOrder: any = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrdersAdmin().subscribe({
      next: (res: any) => this.orders = res.orders || res,
      error: (err) => console.error(err)
    });
  }

  viewOrder(order: any) {
    this.selectedOrder = order;
    const modalEl = document.getElementById('orderModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  updateStatus(order: any, newStatus: string) {
    this.orderService.updateOrderAdmin(order._id, { status: newStatus }).subscribe({
      next: (res: any) => {
        this.loadOrders(); // إعادة تحميل الطلبات بعد التحديث
      },
      error: (err) => console.error(err)
    });
  }
}

