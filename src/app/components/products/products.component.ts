import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ActionsEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';
import { catchError, map, startWith } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$:Observable<AppDataState<Product[]>> | null =null;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productsService:ProductsService, private router:Router ) { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.products$  = this.productsService.getAllProducts().pipe(
      map(data=>({dataState : DataStateEnum.LOADED, data:data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onGetSelectedProducts(){
    this.products$  = this.productsService.getSelectedProducts().pipe(
      map(data=>({dataState : DataStateEnum.LOADED, data:data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onGetAvailableProducts(){
    this.products$  = this.productsService.getAvailableProducts().pipe(
      map(data=>({dataState : DataStateEnum.LOADED, data:data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSearch(dataForm: any){
    this.products$  = this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data=>({dataState : DataStateEnum.LOADED, data:data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSelect(p: Product){
    this.productsService.select(p)
      .subscribe(data=>{
          p.selected = data.selected;
      });
  }

  onDelete(p: Product){
    this.productsService.delete(p)
      .subscribe(data=>{
         this.onGetAllProducts();
      });
  }

  onNewProduct(){
    this.router.navigateByUrl("/newProduct");
  }

  onEdit(p: Product){
    this.router.navigateByUrl("/editProduct/"+p.id);

  }

  onActionsEvent($event: any){
    switch($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS: this.onGetAllProducts(); break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts(); break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts(); break;
      case ProductActionsTypes.NEW_PRODUCTS: this.onNewProduct(); break;
      case ProductActionsTypes.SEARCH_PRODUCTS: this.onSearch($event.payload); break;
      case ProductActionsTypes.DELETE: this.onDelete($event.payload); break;
      case ProductActionsTypes.EDIT: this.onEdit($event.payload); break;
      case ProductActionsTypes.SELECT: this.onSelect($event.payload); break;
    }
  }



}
