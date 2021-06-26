import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailelementComponent } from './detailelement.component';

describe('DetailelementComponent', () => {
  let component: DetailelementComponent;
  let fixture: ComponentFixture<DetailelementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailelementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
