import {
  Component,
  Input,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter,
  OnInit,
  AfterContentInit,
  AfterViewInit,
  Query, ContentChildren, ViewChildren, QueryList, AfterContentChecked
} from '@angular/core';
import {SelectOptionComponent, OptionParentComponent} from '../select-option/select-option.component';

import {Option, OptionValue, OptionsFilter, OptionsTemplateContext} from './types';

type OptionValueGetterFn = (option: Option) => OptionValue;
type OptionDisabledGetterFn = (option: Option) => boolean;

@Component({
  selector: 'a-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OptionParentComponent, OnInit {
  @Input() options: Option[];
  @Input() optionValueGetter: string | OptionValueGetterFn = 'value';
  @Input() optionDisabledGetter: string | OptionDisabledGetterFn = 'disabled';
  @Input() optionsFilter: OptionsFilter;
  @Input()
  get selected(): OptionValue {
    return this._selected;
  }

  set selected(value: OptionValue) {
    if (this._selected === value) {
      return;
    }

    this._selected = value;
    this.selectedChange.emit(value);
  }

  @Output() selectedChange = new EventEmitter<OptionValue>();

  opened = false;
  @ContentChild('options') optionsTemplate: TemplateRef<OptionsTemplateContext>;
  private _selected: OptionValue;

  ngOnInit() {
    const {optionValueGetter, optionDisabledGetter} = this;

    if (typeof optionValueGetter === 'string') {
      this.optionValueGetter = option => option[optionValueGetter];
    }

    if (typeof optionDisabledGetter === 'string') {
      this.optionDisabledGetter = option => Boolean(option[optionDisabledGetter]);
    }
  }

  getOptionKey = (index: number, option: Option) => {
    return this.getOptionValue(option);
  }

  getOptionValue(option: Option): OptionValue {
    return option ? (this.optionValueGetter as OptionValueGetterFn)(option) : null;
  }

  isOptionDisabled(option: Option): boolean {
    return (this.optionDisabledGetter as OptionDisabledGetterFn)(option);
  }

  isOptionSelected(option: Option): boolean {
    return this.selected === this.getOptionValue(option);
  }

  clearSelected() {
    this.selected = null;
    this.opened = false;
  }

  handleOptionClick(option: Option) {
    if (this.isOptionDisabled(option)) {
      return;
    }

    this.selected = this.getOptionValue(option);
    this.opened = false;
  }
}
