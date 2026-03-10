import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFashionDetail } from './admin-fashion-detail';

describe('AdminFashionDetail', () => {
  let component: AdminFashionDetail;
  let fixture: ComponentFixture<AdminFashionDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFashionDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFashionDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
