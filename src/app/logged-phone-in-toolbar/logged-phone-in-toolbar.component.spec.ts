import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedPhoneInToolbarComponent } from './logged-phone-in-toolbar.component';

describe('LoggedPhoneInToolbarComponent', () => {
  let component: LoggedPhoneInToolbarComponent;
  let fixture: ComponentFixture<LoggedPhoneInToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedPhoneInToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedPhoneInToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
