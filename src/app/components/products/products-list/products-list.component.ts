import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ActionsEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {



  @Input() productsInput$:Observable<AppDataState<Product[]>>|null=null;
  @Output() productsEventEmitter: EventEmitter<ActionsEvent>=new EventEmitter<ActionsEvent>();
  readonly DataStateEnum = DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }
  onSelect(p: Product){
    this.productsEventEmitter.emit({
      type:ProductActionsTypes.SELECT,
       payload: p
      });
  }

  onDelete(p: Product){
    this.productsEventEmitter.emit({
      type:ProductActionsTypes.DELETE,
       payload: p
      });
  }

  onEdit(p: Product){
    this.productsEventEmitter.emit({
      type:ProductActionsTypes.EDIT,
      payload: p
    });
  }

  onActionEvent($event: any){
    this.productsEventEmitter.emit($event);
  }

}
