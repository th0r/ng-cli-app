import {Component, Input, OnInit, Output, EventEmitter, forwardRef, ElementRef, HostListener} from '@angular/core';
import {SelectComponent} from '../select/select.component';

import {Option, OptionValue} from '../select/types';

export abstract class OptionParentComponent {
  handleOptionClick: (option: Option) => void;
}

@Component({
  selector: 'a-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss'],
  providers: [
    {
      provide: OptionParentComponent,
      useExisting: forwardRef(() => SelectComponent)
    }
  ]
})
export class SelectOptionComponent {
  @Input() option: Option;
  @Input() className?: string;

  constructor(
    private elemRef: ElementRef,
    private select: OptionParentComponent
  ) {}

  get element(): HTMLElement {
    return this.elemRef.nativeElement;
  }

  @HostListener('click')
  handleClick() {
    this.select.handleOptionClick(this.option);
  }
}
