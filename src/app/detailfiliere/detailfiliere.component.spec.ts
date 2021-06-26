import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailfiliereComponent } from './detailfiliere.component';

describe('DetailfiliereComponent', () => {
  let component: DetailfiliereComponent;
  let fixture: ComponentFixture<DetailfiliereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailfiliereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailfiliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
