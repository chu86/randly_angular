import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionComponent } from './collections.component';

describe('UserListComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionComponent]
    });
    fixture = TestBed.createComponent(CollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
