import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementEditComponent } from './agreement-edit.component';

describe('AgreementEditComponent', () => {
  let component: AgreementEditComponent;
  let fixture: ComponentFixture<AgreementEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgreementEditComponent]
    });
    fixture = TestBed.createComponent(AgreementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
