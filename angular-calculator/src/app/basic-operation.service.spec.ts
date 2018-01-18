import { TestBed, inject } from '@angular/core/testing';

import { BasicOperationService } from './basic-operation.service';

describe('BasicOperationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicOperationService]
    });
  });

  it('should be created', inject([BasicOperationService], (service: BasicOperationService) => {
    expect(service).toBeTruthy();
  }));
});
