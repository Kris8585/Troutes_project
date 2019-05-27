import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingEditorComponent } from './assing-editor.component';

describe('AssingEditorComponent', () => {
  let component: AssingEditorComponent;
  let fixture: ComponentFixture<AssingEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssingEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssingEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
