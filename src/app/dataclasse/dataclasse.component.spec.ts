import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataclasseComponent } from './dataclasse.component';

describe('DataclasseComponent', () => {
  let component: DataclasseComponent;
  let fixture: ComponentFixture<DataclasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataclasseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataclasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
