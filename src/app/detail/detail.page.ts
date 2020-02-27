import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPage {

  constructor() { }

  openModal() {

  }
}
