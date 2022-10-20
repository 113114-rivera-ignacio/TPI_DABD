import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackjackCartasComponent } from './blackjack-cartas.component';

describe('BlackjackCartasComponent', () => {
  let component: BlackjackCartasComponent;
  let fixture: ComponentFixture<BlackjackCartasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackjackCartasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackjackCartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
