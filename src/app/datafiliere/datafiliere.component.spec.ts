import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatafiliereComponent } from './datafiliere.component';

describe('DatafiliereComponent', () => {
  let component: DatafiliereComponent;
  let fixture: ComponentFixture<DatafiliereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatafiliereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatafiliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
