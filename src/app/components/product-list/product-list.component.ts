import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  viewDetails(product: any): void {
    if (product && product.id) {
      this.router.navigate(['/product', product.id]);
    } else {
      console.error('Product ID is undefined');
    }
  }

  addToCart(product: any): void {
    if (product.quantity > 0) {
      this.cartService.addToCart(product);
      product.quantity -= 1; // Update the product quantity
    } else {
      console.error('Product is out of stock');
    }
  }
}