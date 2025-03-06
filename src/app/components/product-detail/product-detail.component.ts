import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  errorMessage: string | null = null;
  showMessage: boolean = false;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        product => {
          this.product = product;
          this.errorMessage = null;
        },
        error => {
          this.errorMessage = error;
          console.error('Error fetching product details:', error);
        }
      );
    }
  }

  addToCart(): void {
    if (this.product.quantity > 0) {
      this.cartService.addToCart(this.product);
      this.product.quantity -= 1; // Update the product quantity
      this.showMessage = true;
      this.message = 'Product added to cart!';
      this.cdr.detectChanges(); // Manually trigger change detection
      setTimeout(() => {
        this.showMessage = false;
        this.cdr.detectChanges(); // Manually trigger change detection
      }, 3000);
    } else {
      this.showMessage = true;
      this.message = 'Product is out of stock!';
      this.cdr.detectChanges(); // Manually trigger change detection
      setTimeout(() => {
        this.showMessage = false;
        this.cdr.detectChanges(); // Manually trigger change detection
      }, 3000);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}