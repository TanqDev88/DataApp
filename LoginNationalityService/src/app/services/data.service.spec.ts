import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InformationService } from './data.service';
import { Gender } from '../models/Gender';
import { Nationalize } from '../models/Nationality';

describe('InformationService', () => {
  let service: InformationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InformationService]
    });
    service = TestBed.inject(InformationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should determine gender', () => {
    const mockGenderData: Gender = {
      name: 'male', probability: 0.99, count: 1000,
      gender: ''
    };
    const name = 'John';

    service.determineGender(name).subscribe((data: Gender) => {
      expect(data).toEqual(mockGenderData);
    });

    const req = httpMock.expectOne(service['genderUrlApi'] + name);
    expect(req.request.method).toBe('GET');
    req.flush(mockGenderData);
  });

  it('should determine nationality', () => {
    const mockNationalityData: Nationalize = {
      country: [{ country_id: 'US', probability: 0.5 }],
      count: 0,
      name: ''
    };
    const name = 'John';

    service.determineNationality(name).subscribe((data: Nationalize) => {
      expect(data).toEqual(mockNationalityData);
    });

    const req = httpMock.expectOne(service['nationalizeUrlApi'] + name);
    expect(req.request.method).toBe('GET');
    req.flush(mockNationalityData);
  });
});
