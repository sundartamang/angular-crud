import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  productFormGroup: FormGroup;
  product: Product;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { this.setupForm() }

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.params['id']

    if (productId) {
      this.getProductDetail(productId)
    }
  }

  updateProduct() {
    if (this.productFormGroup.valid) {
      const updatedProduct = this.productFormGroup.getRawValue();
      this.productService.updateProduct(updatedProduct, this.product.id).subscribe((response) => {
        if (response) {
          this.redirectToProductList();
        }
      });
    }
  }

  redirectToProductList() {
    this.router.navigate(['/'])
  }

  private getProductDetail(productId: number) {
    this.productService.getProductDetail(productId).subscribe((product) => {
      if (product) {
        this.product = product;
        this.productFormGroup.patchValue({
          name: product.name,
          price: product.price,
          description: product.description
        });
      }
    })
  }

  private setupForm() {
    this.productFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

}
