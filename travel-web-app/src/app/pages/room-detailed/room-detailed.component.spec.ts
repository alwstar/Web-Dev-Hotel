import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailedComponent } from './room-detailed.component';

describe('RoomDetailedComponent', () => {
  let component: RoomDetailedComponent;
  let fixture: ComponentFixture<RoomDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDetailedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
