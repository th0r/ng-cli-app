import _ from 'lodash';
import {
  Component,
  Input,
  TemplateRef,
  ContentChildren,
  QueryList,
  OnDestroy,
  SimpleChanges,
  OnChanges, AfterContentInit, ViewChildren, AfterViewInit
} from '@angular/core';

import {SelectComponent} from '../select/select.component';
import {SelectOptionComponent} from '../select-option/select-option.component';

import {
  Option,
  OptionValue,
  OptionsTemplateContext
} from '../select/types';

type OptionValueGetterFn = (option: Option) => OptionValue;
type OptionDisabledGetterFn = (option: Option) => boolean;

@Component({
  selector: 'a-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent implements OnChanges, OnDestroy, AfterContentInit {
  @Input() options: Option[];
  @Input() optionsTemplate: TemplateRef<OptionsTemplateContext>;

  filteredOptions: Option[];
  filter = '';
  activeOption: Option;
  handleFilterChange = _.debounce((filter: string) => {
    this.filter = filter;
    this.updateFilteredOptions();
  }, 300);

  @ContentChildren(SelectOptionComponent, {descendants: true}) optionComps: QueryList<SelectOptionComponent>;

  constructor(
    private select: SelectComponent
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options) {
      this.updateFilteredOptions();
    }
  }

  ngAfterContentInit() {
    this.handleOptionCompsChange();
    this.optionComps.changes.subscribe(this.handleOptionCompsChange);
  }

  ngOnDestroy() {
    this.handleFilterChange.cancel();
  }

  handleOptionCompsChange = () => {
    console.log('change', this.optionComps.length);
  }

  updateFilteredOptions() {
    if (!this.filter) {
      this.filteredOptions = this.options;
      return;
    }

    const filterFn = this.select.optionsFilter || this.defaultOptionsFilter;
    this.filteredOptions = filterFn(this.options, this.filter);
    console.log(this.optionComps.length);
  }

  defaultOptionsFilter(options: Option[], filter: string): Option[] {
    const filterRegexp = new RegExp(_.escapeRegExp(filter), 'i');
    return _.filter(options, option =>
      (typeof option.label === 'string') ? filterRegexp.test(option.label) : true
    );
  }
}
