import { Component, OnInit, Input, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import fieldsOptions from '../../product-output/product-output-form/product-output-fields-options';
import { ProductIdFieldService } from './product-id-field.service';
import { Select2Component } from 'ng2-select2';

@Component({
  selector: 'product-output-form',
  templateUrl: './product-output-form.component.html',
  styleUrls: ['./product-output-form.component.css']
})
export class ProductOutputFormComponent implements OnInit {

    @Input()
    form: FormGroup;
    @ViewChild(Select2Component, {read: ElementRef})
    select2Element: ElementRef
      
    constructor(private changeRef: ChangeDetectorRef, 
                public productIdField: ProductIdFieldService) { }

    ngOnInit() {
        this.productIdField.make(this.select2Element, this.form.get('product_id'));
    }

    ngOnChanges(){
        this.changeRef.detectChanges();
    }
    
    get fieldsOptions() : any {
        return fieldsOptions;
    }

}
