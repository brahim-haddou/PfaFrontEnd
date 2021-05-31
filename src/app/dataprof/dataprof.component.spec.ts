import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataprofComponent } from './dataprof.component';

describe('DataprofComponent', () => {
  let component: DataprofComponent;
  let fixture: ComponentFixture<DataprofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataprofComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
