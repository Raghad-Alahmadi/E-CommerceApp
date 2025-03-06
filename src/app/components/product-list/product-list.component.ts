import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  viewDetails(product: any): void {
    console.log('Viewing details for', product);
    this.selectedProduct = product;
    console.log('Selected product:', this.selectedProduct);
  }

  closeDetails(): void {
    this.selectedProduct = null;
  }
}