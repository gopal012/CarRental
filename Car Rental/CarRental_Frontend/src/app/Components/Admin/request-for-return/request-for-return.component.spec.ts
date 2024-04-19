import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForReturnComponent } from './request-for-return.component';

describe('RequestForReturnComponent', () => {
  let component: RequestForReturnComponent;
  let fixture: ComponentFixture<RequestForReturnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestForReturnComponent]
    });
    fixture = TestBed.createComponent(RequestForReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
