import { Component } from '@angular/core';
import { Gender } from '../../models/Gender';
import { Nationalize } from '../../models/Nationality';
import { InformationService } from '../../services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main-Site.component.html',
  styleUrls: ['./main-Site.component.scss'],
})
export class MainSiteComponent {
  name: string = '';
  genderData: any;
  nationalityData: any;

  constructor(private informationService: InformationService) {}

  onSubmit() {
    this.informationService
      .determineGender(this.name)
      .subscribe((data: Gender) => {
        this.genderData = data;
      });

    this.informationService
      .determineNationality(this.name)
      .subscribe((data: Nationalize) => {
        this.nationalityData = data;
      });
  }
}
