import { TestBed } from '@angular/core/testing';

import { ClassroomService } from './classroom-service.service';

describe('ClassroomServiceService', () => {
  let service: ClassroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
