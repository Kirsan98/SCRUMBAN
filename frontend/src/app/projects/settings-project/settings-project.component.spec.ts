import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsProjectComponent } from './settings-project.component';

describe('SettingsProjectComponent', () => {
  let component: SettingsProjectComponent;
  let fixture: ComponentFixture<SettingsProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
