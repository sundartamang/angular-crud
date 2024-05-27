import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model';
import { ProductService } from 'src/app/service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.params['id']

    if (productId) {
      this.getProductDetail(productId)
    }
  }

  private getProductDetail(productId: number) {
    this.productService.getProductDetail(productId).subscribe((product) => {
      if (product) {
        this.product = product
      }
    })
  }

}
