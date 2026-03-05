import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStore } from './product-store';

describe('ProductStore', () => {
  let component: ProductStore;
  let fixture: ComponentFixture<ProductStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductStore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
