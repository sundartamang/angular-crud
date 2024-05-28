import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, SearchService } from 'src/app/service';
import { Product } from 'src/app/model';
import { Router } from '@angular/router';
import { Subject, takeUntil, pipe } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productFormGroup: FormGroup;
  products: Product[] = [];
  selectedProduct: Product;

  @ViewChild('closeCreateProductConfirmModal') closeCreateProductConfirmModal: ElementRef;
  @ViewChild('closeDeleteProductConfirmModal') closeDeleteProductConfirmModal: ElementRef;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private searchService: SearchService,
    private router: Router
  ) { this.setupForm() }

  ngOnInit(): void {
    this.searchService.searchTerms$.
      pipe(takeUntil(this.ngUnsubscribe)).
      subscribe(term => {
        this.filterProducts(term);
      });

    this.getProducts();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  createProduct() {
    const product = this.productFormGroup.getRawValue();
    this.productService.createProduct(product).subscribe((response) => {
      if (response) {
        this.productFormGroup.reset();
        this.getProducts();
        this.closeCreateProductConfirmModal.nativeElement.click();
      }
    })
  }

  viewProduct(productId: number) {
    this.router.navigate(['products', productId])
  }

  editProduct(product: Product) {
    this.router.navigate(['products', product.id, 'edit'])
  }

  getProductDetail(product: Product) {
    this.selectedProduct = product;
  }

  deleteProduct() {
    this.productService.deleteProduct(this.selectedProduct.id).subscribe((response) => {
      if (response) {
        this.getProducts();
        this.closeDeleteProductConfirmModal.nativeElement.click();
      }
    })
  }

  private filterProducts(searchTerm: string) {
    this.productService.searchProducts(searchTerm).subscribe((results: Product[]) => {
      if(results){
        this.products = results
      }
    });
  }

  private getProducts() {
    this.productService.getProductList().subscribe((product) => {
      if (product) {
        this.products = product
      } else {
        this.products = []
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
