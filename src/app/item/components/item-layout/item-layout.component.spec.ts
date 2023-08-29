import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLayoutComponent } from './item-layout.component';

describe('ItemLayoutComponent', () => {
  let component: ItemLayoutComponent;
  let fixture: ComponentFixture<ItemLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemLayoutComponent]
    });
    fixture = TestBed.createComponent(ItemLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
