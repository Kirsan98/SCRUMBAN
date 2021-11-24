import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletesprintComponent } from './deletesprint.component';

describe('DeletesprintComponent', () => {
  let component: DeletesprintComponent;
  let fixture: ComponentFixture<DeletesprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletesprintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletesprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
