import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteUnoComponent } from './reporte-uno.component';

describe('ReporteUnoComponent', () => {
  let component: ReporteUnoComponent;
  let fixture: ComponentFixture<ReporteUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteUnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
