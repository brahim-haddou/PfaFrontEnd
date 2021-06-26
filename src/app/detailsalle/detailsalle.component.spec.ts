import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsalleComponent } from './detailsalle.component';

describe('DetailsalleComponent', () => {
  let component: DetailsalleComponent;
  let fixture: ComponentFixture<DetailsalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
