import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionAdminComponent } from './attraction-admin.component';

describe('AttractionAdminComponent', () => {
  let component: AttractionAdminComponent;
  let fixture: ComponentFixture<AttractionAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractionAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
