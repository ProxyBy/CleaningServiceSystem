import { TestBed, inject } from '@angular/core/testing';

import { CleaningTypeService } from './cleaning-type.service';

describe('CleaningTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CleaningTypeService]
    });
  });

  it('should be created', inject([CleaningTypeService], (service: CleaningTypeService) => {
    expect(service).toBeTruthy();
  }));
});
