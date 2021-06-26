import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailprofComponent } from './detailprof.component';

describe('DetailprofComponent', () => {
  let component: DetailprofComponent;
  let fixture: ComponentFixture<DetailprofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailprofComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
