import {SelectComponent} from './select.component';

export type Option = any;
export type OptionValue = any;
export type OptionsFilter = (options: Option[], filter: string) => Option[];

export interface OptionsTemplateContext {
  $implicit: SelectComponent;
  options: Option[];
  filter: string;
}
