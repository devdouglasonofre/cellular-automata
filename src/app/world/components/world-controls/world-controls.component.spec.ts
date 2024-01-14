import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldControlsComponent } from './world-controls.component';

describe('WorldControlsComponent', () => {
  let component: WorldControlsComponent;
  let fixture: ComponentFixture<WorldControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
