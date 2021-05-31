import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatamoduleComponent } from './datamodule.component';

describe('DatamoduleComponent', () => {
  let component: DatamoduleComponent;
  let fixture: ComponentFixture<DatamoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatamoduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatamoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
