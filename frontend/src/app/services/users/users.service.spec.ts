import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let http:HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[UsersService]
    });
    service = TestBed.inject(UsersService);
    http=TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
