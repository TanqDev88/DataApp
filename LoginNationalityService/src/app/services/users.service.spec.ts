import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { User } from './../models/User';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true for correct login credentials', (done: DoneFn) => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'test@example.com',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '37.3159',
            lng: '81.1496'
          }
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets'
        }
      }
    ];

    service.login('test@example.com', '37.3159').subscribe((isValid) => {
      expect(isValid).toBe(true);
      done();
    });

    const req = httpMock.expectOne(service['urlApi']);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should return false for incorrect login credentials', (done: DoneFn) => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'test@example.com',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '37.3159',
            lng: '81.1496'
          }
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets'
        }
      }
    ];

    service.login('test@example.com', 'wronglat').subscribe((isValid) => {
      expect(isValid).toBe(false);
      done();
    });

    const req = httpMock.expectOne(service['urlApi']);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});

