import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../../services/order.service';
import { CommonModule } from '@angular/common';

declare var bootstrap: any; // لاستخدام مكتبة Bootstrap JS

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  selectedOrder: Order | null = null;
  private modalInstance: any;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrdersAdmin().subscribe({
      next: (res: any) => {
        this.orders = res.orders || res;
      },
      error: (err) => console.error('Error fetching orders:', err)
    });
  }

  viewOrder(order: Order) {
    this.selectedOrder = order;
    const modalEl = document.getElementById('orderModal');
    if (modalEl) {
      this.modalInstance = new bootstrap.Modal(modalEl);
      this.modalInstance.show();
    }
  }

  updateStatus(order: Order, newStatus: string) {
    this.orderService.updateOrderAdmin(order._id, { status: newStatus }).subscribe({
      next: () => {
        this.loadOrders();
        if (this.modalInstance) {
          this.modalInstance.hide();
        }
      },
      error: (err) => alert('حدث خطأ أثناء تحديث الحالة')
    });
  }
}