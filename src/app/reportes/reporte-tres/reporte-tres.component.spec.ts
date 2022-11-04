import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTresComponent } from './reporte-tres.component';

describe('ReporteTresComponent', () => {
  let component: ReporteTresComponent;
  let fixture: ComponentFixture<ReporteTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteTresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
