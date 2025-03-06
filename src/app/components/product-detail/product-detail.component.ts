import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Product ID:', productId); 
    if (productId) {
      this.productService.getProductById(productId).subscribe(product => {
        console.log('Fetched Product:', product); 
        this.product = product;
      }, error => {
        console.error('Error fetching product details:', error);
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}