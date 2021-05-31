import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbuttonComponent } from './userbutton.component';

describe('UserbuttonComponent', () => {
  let component: UserbuttonComponent;
  let fixture: ComponentFixture<UserbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserbuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
