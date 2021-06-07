import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventConfigComponent } from './event-config.component';

describe('EventConfigComponent', () => {
  let component: EventConfigComponent;
  let fixture: ComponentFixture<EventConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
