import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {



  submitted:boolean=false;

  productFormGroup=this.fb.group({
    name:["",Validators.required],
    price:[0,Validators.required],
    quantity:[0,Validators.required],
    selected:[true,Validators.required],
    available:[true,Validators.required]
  });

  constructor(private fb:FormBuilder, private productService:ProductsService) { }

  ngOnInit(): void {
  }



  onSave(){
    this.submitted = true;
    if(this.productFormGroup.invalid) return;
    this.productService.save(this.productFormGroup.value).subscribe(
      data=>{
        alert("success");
      }
    );
  }

}
