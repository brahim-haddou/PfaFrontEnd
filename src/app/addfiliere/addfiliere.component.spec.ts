import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfiliereComponent } from './addfiliere.component';

describe('AddfiliereComponent', () => {
  let component: AddfiliereComponent;
  let fixture: ComponentFixture<AddfiliereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfiliereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfiliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
