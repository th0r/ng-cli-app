import _ from 'lodash';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'a-select-page',
  templateUrl: './select-page.component.html',
  styleUrls: ['./select-page.component.scss']
})
export class SelectPageComponent implements OnInit {

  loading = true;

  simpleOptions = [
    {
      label: 'Item 1',
      value: 'item1',
      disabled: true
    },
    {
      label: 'Item 2',
      value: 'item2'
    },
    {
      label: 'Item 3',
      value: 'item3'
    }
  ];

  groupedOptions = [
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
  ];

  ngOnInit() {
    setTimeout(() => this.loading = false, 5000);
  }

  filterOptionGroups(groups: any[], filter: string) {
    const filterRegexp = new RegExp(`(?:${_.escapeRegExp(filter)})`, 'i');
    return _.transform(groups, (filteredGroups, group) => {
      const options = _.filter(group.options, option => filterRegexp.test(option.label));

      if (options.length) {
        filteredGroups.push({
          ...group,
          options
        });
      }
    }, []);
  }

  getOptionGroupKey(index: number, group: any) {
    return group.label;
  }

}
