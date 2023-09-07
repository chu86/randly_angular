import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomModalComponent } from './random-modal.component';

describe('RandomModalComponent', () => {
  let component: RandomModalComponent;
  let fixture: ComponentFixture<RandomModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RandomModalComponent]
    });
    fixture = TestBed.createComponent(RandomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
