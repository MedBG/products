import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ActionsEvent, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product?: Product;

  @Output() productEventEmitter: EventEmitter<ActionsEvent>=new EventEmitter<ActionsEvent>();


  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product: Product){
    this.productEventEmitter.emit({
      type:ProductActionsTypes.SELECT,
      payload: product
    });
  }

  onEdit(product: Product){
    this.productEventEmitter.emit({
      type:ProductActionsTypes.EDIT,
      payload: product
    });
  }

  onDelete(product: Product){
    this.productEventEmitter.emit({
      type:ProductActionsTypes.DELETE,
      payload: product
    });
  }

}
