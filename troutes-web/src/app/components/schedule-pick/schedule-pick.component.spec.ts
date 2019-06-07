import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePickComponent } from './schedule-pick.component';

describe('SchedulePickComponent', () => {
  let component: SchedulePickComponent;
  let fixture: ComponentFixture<SchedulePickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulePickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulePickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
