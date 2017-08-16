import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {observable} from 'mobx-angular';

@Component({
  selector: 'a-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {
  @observable @Input() title;

  constructor() {}

  ngOnInit() {}
}
