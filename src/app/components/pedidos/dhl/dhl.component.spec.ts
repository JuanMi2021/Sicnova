import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhlComponent } from './dhl.component';

describe('DhlComponent', () => {
  let component: DhlComponent;
  let fixture: ComponentFixture<DhlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DhlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DhlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
