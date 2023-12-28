import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number = 1;

  constructor(private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {
    // check if id param is avaliable 
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

    if (hasCategoryId) {
      // get the id from param string and convert sting in to a number using + symbol 
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id")!;
    }
    else {
      // if no category is not available it will be set to one
      this.currentCategoryId = 1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  };
}
