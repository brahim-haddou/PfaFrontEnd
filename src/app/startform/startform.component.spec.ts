import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartformComponent } from './startform.component';

describe('StartformComponent', () => {
  let component: StartformComponent;
  let fixture: ComponentFixture<StartformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
