import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteLayoutComponent } from './invite-layout.component';

describe('InviteLayoutComponent', () => {
  let component: InviteLayoutComponent;
  let fixture: ComponentFixture<InviteLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InviteLayoutComponent]
    });
    fixture = TestBed.createComponent(InviteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
