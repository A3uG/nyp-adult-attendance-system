import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmScanComponent } from './am-scan.component';

describe('AmScanComponent', () => {
  let component: AmScanComponent;
  let fixture: ComponentFixture<AmScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmScanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
