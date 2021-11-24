import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSprintComponent } from './single-sprint.component';

describe('SingleSprintComponent', () => {
  let component: SingleSprintComponent;
  let fixture: ComponentFixture<SingleSprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSprintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
