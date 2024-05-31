import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDirectionsComponent } from './item-directions.component';

describe('ItemMainComponent', () => {
  let component: ItemDirectionsComponent;
  let fixture: ComponentFixture<ItemDirectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemDirectionsComponent]
    });
    fixture = TestBed.createComponent(ItemDirectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
