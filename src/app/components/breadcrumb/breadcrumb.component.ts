import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() product: Product;
  @Input() showProductName: boolean= true;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  redirectToProductDetail(){
    this.router.navigate(['products', this.product.id])
  }

}
