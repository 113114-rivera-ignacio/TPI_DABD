import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCincoComponent } from './reporte-cinco.component';

describe('ReporteCincoComponent', () => {
  let component: ReporteCincoComponent;
  let fixture: ComponentFixture<ReporteCincoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCincoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteCincoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
