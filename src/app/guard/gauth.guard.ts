import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';   // ← غيّر المسار لو الـ service مش في services/
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  id: string;
  role: string;
  exp?: number;
}

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    // التوكن منتهي؟
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      authService.logout();
      router.navigate(['/login']);
      return false;
    }

    // مش admin؟
    if (decoded.role !== 'admin') {
      router.navigate(['/login']);   // أو '/access-denied' لو عندك صفحة كده
      return false;
    }

    // تمام → اسمح الدخول
    return true;

  } catch (err) {
    console.error('توكن غير صالح', err);
    authService.logout();
    router.navigate(['/login']);
    return false;
  }
};