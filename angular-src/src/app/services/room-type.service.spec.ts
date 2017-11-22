import { TestBed, inject } from '@angular/core/testing';

import { RoomTypeService } from './room-type.service';

describe('RoomTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomTypeService]
    });
  });

  it('should be created', inject([RoomTypeService], (service: RoomTypeService) => {
    expect(service).toBeTruthy();
  }));
});
