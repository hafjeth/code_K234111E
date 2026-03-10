import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFashion } from './client-fashion';

describe('ClientFashion', () => {
  let component: ClientFashion;
  let fixture: ComponentFixture<ClientFashion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientFashion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientFashion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
