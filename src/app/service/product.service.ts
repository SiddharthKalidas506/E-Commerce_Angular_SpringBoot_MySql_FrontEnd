import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }


  getProductList(id: number): Observable<Product[]> {
    // need URL based of category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${id}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.product) // Update to match the corrected interface
    );
  }
}

interface GetResponse {
  _embedded: {
    product: Product[];
  }
}


