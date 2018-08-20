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
      
    constructor(private changeRef: ChangeDetectorRef) { }

    ngOnInit() {
    }

    ngOnChanges(){
        this.changeRef.detectChanges();
    }
    
    get fieldsOptions() : any {
        return fieldsOptions;
    }

}
