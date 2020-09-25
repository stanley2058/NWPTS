import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityEntriesComponent } from './entity-entries.component';

describe('EntityEntriesComponent', () => {
  let component: EntityEntriesComponent;
  let fixture: ComponentFixture<EntityEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityEntriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
