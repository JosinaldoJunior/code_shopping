import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOutputSearchFormComponent } from './product-output-search-form.component';

describe('ProductOutputSearchFormComponent', () => {
  let component: ProductOutputSearchFormComponent;
  let fixture: ComponentFixture<ProductOutputSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOutputSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOutputSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
