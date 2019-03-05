import { Component } from '@angular/core';
import { Recipe } from 'src/app/dtos/recipe.dto';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(
    private dataService: DataService,
  ) {}
}
