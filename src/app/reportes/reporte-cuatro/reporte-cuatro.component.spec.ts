import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCuatroComponent } from './reporte-cuatro.component';

describe('ReporteCuatroComponent', () => {
  let component: ReporteCuatroComponent;
  let fixture: ComponentFixture<ReporteCuatroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCuatroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteCuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
