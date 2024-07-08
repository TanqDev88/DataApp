import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MainSiteComponent } from './main-site.component';
import { InformationService } from '../../services/data.service';
import { Gender } from '../../models/Gender';
import { Nationalize } from '../../models/Nationality';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Factory function for the TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('MainSiteComponent', () => {
  let component: MainSiteComponent;
  let fixture: ComponentFixture<MainSiteComponent>;
  let informationService: InformationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainSiteComponent],
      imports: [
        FormsModule,  // Add FormsModule here
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [InformationService]
    }).compileComponents();

    fixture = TestBed.createComponent(MainSiteComponent);
    component = fixture.componentInstance;
    informationService = TestBed.inject(InformationService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call determineGender and set genderData on onSubmit', () => {
    const mockGenderData: Gender = {
      name: 'male', probability: 0.99, count: 1000,
      gender: ''
    };
    spyOn(informationService, 'determineGender').and.returnValue(of(mockGenderData));

    component.name = 'John';
    component.onSubmit();

    expect(informationService.determineGender).toHaveBeenCalledWith('John');
    expect(component.genderData).toEqual(mockGenderData);
  });

  it('should call determineNationality and set nationalityData on onSubmit', () => {
    const mockNationalityData: Nationalize = {
      country: [{ country_id: 'US', probability: 0.5 }],
      count: 0,
      name: ''
    };
    spyOn(informationService, 'determineNationality').and.returnValue(of(mockNationalityData));

    component.name = 'John';
    component.onSubmit();

    expect(informationService.determineNationality).toHaveBeenCalledWith('John');
    expect(component.nationalityData).toEqual(mockNationalityData);
  });

  it('should call both determineGender and determineNationality on onSubmit', () => {
    const mockGenderData: Gender = {
      name: 'male', probability: 0.99, count: 1000,
      gender: ''
    };
    const mockNationalityData: Nationalize = {
      country: [{ country_id: 'US', probability: 0.5 }],
      count: 0,
      name: ''
    };

    spyOn(informationService, 'determineGender').and.returnValue(of(mockGenderData));
    spyOn(informationService, 'determineNationality').and.returnValue(of(mockNationalityData));

    component.name = 'John';
    component.onSubmit();

    expect(informationService.determineGender).toHaveBeenCalledWith('John');
    expect(informationService.determineNationality).toHaveBeenCalledWith('John');
    expect(component.genderData).toEqual(mockGenderData);
    expect(component.nationalityData).toEqual(mockNationalityData);
  });
});
