import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  host = environment.host;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.host + '/products');
  }

  getSelectedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.host + '/products?selected=true');
  }

  getAvailableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.host + '/products?available=true');
  }

  searchProducts(keyword:string): Observable<Product[]> {
    return this.http.get<Product[]>(this.host + '/products?name_like='+keyword);
  }

  select(product:Product): Observable<Product> {
    product.selected = !product.selected;
    return this.http.put<Product>(this.host + '/products/'+product.id, product);
  }

  delete(product:Product): Observable<void> {

    return this.http.delete<void>(this.host + '/products/'+product.id);
  }

  save(product:Product): Observable<Product> {
    product.selected = !product.selected;
    return this.http.post<Product>(this.host + '/products/', product);
  }

  getProduct(id:number): Observable<Product> {
    return this.http.get<Product>(this.host + '/products/'+id);
  }

  updateProduct(product:Product): Observable<Product> {
    return this.http.put<Product>(this.host + '/products/'+product.id, product);
  }

}
