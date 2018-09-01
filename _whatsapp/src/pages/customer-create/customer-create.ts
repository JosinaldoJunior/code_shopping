import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { IonicPage, NavController, NavParams, TextInput } from 'ionic-angular';

/**
 * Generated class for the CustomerCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-create',
  templateUrl: 'customer-create.html',
})
export class CustomerCreatePage {
    
  form: FormGroup;
    
  @ViewChild('inputFilePhoto')
  inputFilePhoto: TextInput;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
          name: ['', [Validators.required, Validators.maxLength(255)]],
          email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerCreatePage');
  }
  
  submit(){
      
  }
  
  selectPhoto(){
      const nativeElement =  this.inputFilePhoto.getElementRef().nativeElement;
      const inputFile = nativeElement.querySelector('input');
      inputFile.click();
  }

}
