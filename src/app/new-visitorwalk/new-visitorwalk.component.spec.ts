import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVisitorwalkComponent } from './new-visitorwalk.component';

describe('NewVisitorwalkComponent', () => {
  let component: NewVisitorwalkComponent;
  let fixture: ComponentFixture<NewVisitorwalkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVisitorwalkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVisitorwalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
