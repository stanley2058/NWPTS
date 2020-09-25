import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomRendererComponent } from './classroom-renderer.component';

describe('ClassroomRendererComponent', () => {
  let component: ClassroomRendererComponent;
  let fixture: ComponentFixture<ClassroomRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
