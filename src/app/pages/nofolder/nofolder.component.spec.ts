import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NofolderComponent } from './nofolder.component';

describe('NofolderComponent', () => {
  let component: NofolderComponent;
  let fixture: ComponentFixture<NofolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NofolderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NofolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
