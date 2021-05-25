import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtStartComponent } from './art-start.component';

describe('ArtStartComponent', () => {
  let component: ArtStartComponent;
  let fixture: ComponentFixture<ArtStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
