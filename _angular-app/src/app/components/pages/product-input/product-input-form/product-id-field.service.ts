import { Injectable, ElementRef } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

declare const $;

@Injectable({
  providedIn: 'root'
})

export class ProductIdFieldService {

  data;
  options: Select2Options;
  select2Element: ElementRef;
  
  constructor(private authService: AuthService) { 
      
  }
  
  get divModal()
  {
      const modalElement = this.select2Native.closest('modal');
      return modalElement.firstChild;
  }
  
  get select2Native() : HTMLElement 
  {
      return this.select2Element.nativeElement;
  }
  
  make(select2Element: ElementRef)
  {
      this.select2Element = select2Element;
      this.options = {
              dropdownParent: $(this.divModal)
      }
      this.data = [
                      {id: '1', text: 'Laravel'},
                      {id: '2', text: 'Angular'},
                      {id: '3', text: 'Ionic'}
                  ];
  }
  
}

