import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsLayoutComponent } from './collections-layout.component';

describe('ListLayoutComponent', () => {
  let component: CollectionsLayoutComponent;
  let fixture: ComponentFixture<CollectionsLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionsLayoutComponent]
    });
    fixture = TestBed.createComponent(CollectionsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
