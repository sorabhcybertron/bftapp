import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrestformComponent } from './intrestform.component';

describe('IntrestformComponent', () => {
  let component: IntrestformComponent;
  let fixture: ComponentFixture<IntrestformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrestformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrestformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
