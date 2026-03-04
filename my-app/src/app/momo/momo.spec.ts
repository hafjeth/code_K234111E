import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Momo } from './momo';

describe('Momo', () => {
  let component: Momo;
  let fixture: ComponentFixture<Momo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Momo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Momo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
