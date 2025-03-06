import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlinkComponent } from './addlink.component';

describe('AddlinkComponent', () => {
  let component: AddlinkComponent;
  let fixture: ComponentFixture<AddlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddlinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
