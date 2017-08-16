import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../global.service';

@Component({
  selector: 'a-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  constructor(
    public global: GlobalService
  ) {}

}
