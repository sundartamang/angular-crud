import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProductList(): Observable<Product[]> {
    const url = `${this.API_URL}/products`;
    return this.http.get<Product[]>(url);
  }

  getProductDetail(productId: number): Observable<Product>{
    const url = `${this.API_URL}/products/${productId}`;
    return this.http.get<Product>(url);
  }

  createProduct(product: Product): Observable<Product> {
    const url = `${this.API_URL}/products`;
    return this.http.post<Product>(url, product);
  }

  updateProduct(product: Product, productId:number): Observable<Product> {
    const url = `${this.API_URL}/products/${productId}`;
    return this.http.put<Product>(url, product);
  }

  deleteProduct(productId: number): Observable<Product> {
    const url = `${this.API_URL}/products/${productId}`;
    return this.http.delete<Product>(url);
  }

  searchProducts(query: string): Observable<Product[]> {
    const url = `${this.API_URL}/products?q=${query}`
    return this.http.get<Product[]>(url);
  }
}
