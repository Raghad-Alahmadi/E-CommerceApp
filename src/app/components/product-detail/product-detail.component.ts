import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
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
    this.cartService.addToCart(this.product);
    alert('Product added to cart!');
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}