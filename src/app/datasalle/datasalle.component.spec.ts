import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasalleComponent } from './datasalle.component';

describe('DatasalleComponent', () => {
  let component: DatasalleComponent;
  let fixture: ComponentFixture<DatasalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
