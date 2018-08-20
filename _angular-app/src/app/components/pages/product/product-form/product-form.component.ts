import { Component, OnInit, Input, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import fieldsOptions from '../../product/product-form/product-fields-options';
//import { Select2Component } from 'ng2-select2';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

    @Input()
    form: FormGroup;
    //@ViewChild(Select2Component, {read: ElementRef})
    //select2Element: ElementRef
      
    constructor(private changeRef: ChangeDetectorRef) { }

    ngOnInit() {
        //this.productIdField.make(this.select2Element, this.form.get('product_id'));
    }

    ngOnChanges(){
        this.changeRef.detectChanges();
    }
    
    get fieldsOptions() : any {
        return fieldsOptions;
    }

}
