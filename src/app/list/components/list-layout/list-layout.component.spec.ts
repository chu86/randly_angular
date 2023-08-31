import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLayoutComponent } from './list-layout.component';

describe('ListLayoutComponent', () => {
  let component: ListLayoutComponent;
  let fixture: ComponentFixture<ListLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListLayoutComponent]
    });
    fixture = TestBed.createComponent(ListLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
