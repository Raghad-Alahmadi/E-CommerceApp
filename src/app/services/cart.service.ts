import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemsCount = new BehaviorSubject<number>(0);

  addToCart(product: any): void {
    const existingItem = this.cartItems.find(item => item.productId === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ productId: product.id, productName: product.name, quantity: 1, price: product.price, image: product.image });
    }
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

  decrementQuantity(productId: number): void {
    const existingItem = this.cartItems.find(item => item.productId === productId);
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1;
    } else {
      this.removeFromCart(productId);
    }
    this.cartItemsCount.next(this.cartItems.length);
  }

  removeFromCart(productId: number): void {
    const itemIndex = this.cartItems.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.cartItemsCount.next(this.cartItems.length);
    }
  }
}