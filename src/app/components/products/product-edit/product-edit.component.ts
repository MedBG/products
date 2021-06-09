import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId:number;
  productFormGroup?: FormGroup;
  submitted:boolean=false;

  constructor(private formBuilder:FormBuilder, private activatedRoute: ActivatedRoute, private productService:ProductsService) {
    this.productId=this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe(
      product=>{
        this.productFormGroup=this.formBuilder.group({
          name:[product.name, Validators.required],
          price:[product.price, Validators.required],
          quantity:[product.quantity, Validators.required],
          selected:[product.selected, Validators.required],
          available:[product.available, Validators.required]
        })
      }
    );
  }

  onUpdate(){
    this.submitted = true;
    if(this.productFormGroup?.invalid) return;
    this.productService.updateProduct(this.productFormGroup?.value).subscribe(data=>{
      alert("success");
    })
  }
}
