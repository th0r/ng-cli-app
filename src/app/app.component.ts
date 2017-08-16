import {Component} from '@angular/core';
import {GlobalService} from './global.service';

@Component({
  selector: 'a-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public global: GlobalService
  ) {}
}
