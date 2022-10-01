import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackjackJuegoComponent } from './blackjack-juego.component';

describe('BlackjackJuegoComponent', () => {
  let component: BlackjackJuegoComponent;
  let fixture: ComponentFixture<BlackjackJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackjackJuegoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackjackJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
