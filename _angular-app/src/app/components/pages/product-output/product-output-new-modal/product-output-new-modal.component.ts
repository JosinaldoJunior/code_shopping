import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-output-new-modal',
  templateUrl: './product-output-new-modal.component.html',
  styleUrls: ['./product-output-new-modal.component.css']
})
export class ProductOutputNewModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showModal(){
      this.modal.show();
  }
  
  showErrors(){
      return Object.keys(this.errors).length != 0;
  }
  
  hideModal($event: Event){
      //Fazer algo quando o modal for fechado
      console.log($event);
  }
}
