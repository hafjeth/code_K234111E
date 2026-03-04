import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMomo } from './product-momo';

describe('ProductMomo', () => {
  let component: ProductMomo;
  let fixture: ComponentFixture<ProductMomo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductMomo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMomo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
