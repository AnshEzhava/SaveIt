import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfolderComponent } from './addfolder.component';

describe('AddfolderComponent', () => {
  let component: AddfolderComponent;
  let fixture: ComponentFixture<AddfolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddfolderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddfolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
