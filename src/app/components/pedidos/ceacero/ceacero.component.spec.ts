import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeaceroComponent } from './ceacero.component';

describe('CeaceroComponent', () => {
  let component: CeaceroComponent;
  let fixture: ComponentFixture<CeaceroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeaceroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CeaceroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
