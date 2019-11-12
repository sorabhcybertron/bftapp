import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorwalkComponent } from './visitorwalk.component';

describe('VisitorwalkComponent', () => {
  let component: VisitorwalkComponent;
  let fixture: ComponentFixture<VisitorwalkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorwalkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorwalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
