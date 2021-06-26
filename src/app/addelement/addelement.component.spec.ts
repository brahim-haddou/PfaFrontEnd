import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddelementComponent } from './addelement.component';

describe('AddelementComponent', () => {
  let component: AddelementComponent;
  let fixture: ComponentFixture<AddelementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddelementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
