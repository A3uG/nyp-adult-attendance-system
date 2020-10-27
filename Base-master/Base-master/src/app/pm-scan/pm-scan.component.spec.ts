import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmScanComponent } from './pm-scan.component';

describe('PmScanComponent', () => {
  let component: PmScanComponent;
  let fixture: ComponentFixture<PmScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmScanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
