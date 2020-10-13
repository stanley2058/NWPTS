import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualInsertDialogComponent } from './manual-insert-dialog.component';

describe('ManualInsertDialogComponent', () => {
  let component: ManualInsertDialogComponent;
  let fixture: ComponentFixture<ManualInsertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualInsertDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualInsertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
