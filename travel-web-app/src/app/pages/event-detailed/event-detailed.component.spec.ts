import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailedComponent } from './event-detailed.component';

describe('EventDetailedComponent', () => {
  let component: EventDetailedComponent;
  let fixture: ComponentFixture<EventDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetailedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
