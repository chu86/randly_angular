import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLayoutOldComponent } from './list-layout-old.component';

describe('ListHomeComponent', () => {
  let component: ListLayoutOldComponent;
  let fixture: ComponentFixture<ListLayoutOldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListLayoutOldComponent]
    });
    fixture = TestBed.createComponent(ListLayoutOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
