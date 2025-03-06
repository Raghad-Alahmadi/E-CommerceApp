import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemsCount = new BehaviorSubject<number>(0);

  addToCart(product: any): void {
    this.cartItems.push(product);
    this.cartItemsCount.next(this.cartItems.length);
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  getCartItemsCount(): BehaviorSubject<number> {
    return this.cartItemsCount;
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsCount.next(0);
  }
}