import {Component, DoCheck, OnInit} from '@angular/core';
import {WatcherService} from '../watcher.service';
import {GlobalService} from '../global.service';

@Component({
  selector: 'a-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [WatcherService]
})
export class HomeComponent implements OnInit, DoCheck {
  counter = 0;
  loading = true;
  selectOptions = [
    {
      label: 'Item 1',
      value: 'item1',
      disabled: true
    },
    {
      label: 'Item 2',
      value: 'item2'
    }
  ];
  /*selectOptions = [
    {
      label: 'Group 1',
      options: [
        {
          label: 'Item 1',
          value: 'item1',
          disabled: true
        },
        {
          label: 'Item 2',
          value: 'item2'
        }
      ]
    },
    {
      label: 'Group 2',
      options: [
        {
          label: 'Item 3',
          value: 'item3'
        },
        {
          label: 'Item 4',
          value: 'item4',
          disabled: true
        }
      ]
    }
  ];*/

  constructor(
    public global: GlobalService,
    private watcher: WatcherService
  ) {}

  ngOnInit() {
    this.watcher.watch(
      () => this.counter,
      () => {
        this.updateGlobalValue();
        if (this.counter === 1) {
          this.counter = 2;
        }
      },
      {initial: true}
    );
    setTimeout(() => this.loading = false, 3000);
  }

  ngDoCheck() {
    console.log('ng do check called');
    this.watcher.check();
  }

  getOptionGroupKey(index: number, group: any) {
    return group.label;
  }

  private updateGlobalValue() {
    return this.global.str += this.counter;
  }
}
