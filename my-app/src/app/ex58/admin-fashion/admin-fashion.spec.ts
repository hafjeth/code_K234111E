import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFashion } from './admin-fashion';

describe('AdminFashion', () => {
  let component: AdminFashion;
  let fixture: ComponentFixture<AdminFashion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFashion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFashion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
