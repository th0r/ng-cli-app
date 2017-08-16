import _ from 'lodash';
import {Injectable} from '@angular/core';

type ValueFunction = () => any;
type HandlerFunction = (newValue: any, oldValue: any) => any;

interface WatchOptions {
  context?: any;
  initial?: boolean;
  deep?: boolean;
}

const UNINITIALIZED_VALUE = Symbol('uninitialized value');

@Injectable()
export class WatcherService {
  private watchers = new Set<Watcher>();
  private newWatchers = new Set<Watcher>();
  private scheduledCheckId: number;

  watch(valueFn: ValueFunction, handler: HandlerFunction, opts?: WatchOptions): Watcher {
    const watcher = new Watcher(valueFn, handler, opts, this);
    this.watchers.add(watcher);
    this.scheduleWatcherCheck(watcher);
    return watcher;
  }

  check(watchers = this.watchers) {
    if (watchers.size) {
      watchers.forEach(watcher => watcher.check());
    }
  }

  stopWatchers(...watchers: Watcher[]) {
    _.forEach(watchers, watcher => {
      this.watchers.delete(watcher);
      this.newWatchers.delete(watcher);
    });
  }

  private scheduleWatcherCheck(watcher: Watcher) {
    this.newWatchers.add(watcher);

    if (!this.scheduledCheckId) {
      this.scheduledCheckId = _.defer(() => {
        this.check(this.newWatchers);
        this.newWatchers.clear();
        this.scheduledCheckId = null;
      });
    }
  }
}

export class Watcher {
  value: any = UNINITIALIZED_VALUE;
  opts: WatchOptions;

  constructor(
    private valueFn: ValueFunction,
    private handler: HandlerFunction,
    opts: WatchOptions,
    private service: WatcherService
  ) {
    this.opts = opts || {};
  }

  check() {
    const isFirstCheck = (this.value === UNINITIALIZED_VALUE);
    const oldValue = this.value;
    const newValue = this.valueFn();

    if (!this.isEqual(newValue, oldValue)) {
      this.saveValue(newValue);

      if (isFirstCheck && !this.opts.initial) {
        return;
      }

      this.handler.call(
        this.opts.context || null,
        newValue,
        isFirstCheck ? newValue : oldValue
      );
    }
  }

  stop() {
    this.service.stopWatchers(this);
  }

  private isEqual(value1: any, value2: any): boolean {
    return this.opts.deep ? _.isEqual(value1, value2) : (value1 === value2);
  }

  private saveValue(value: any) {
    this.value = this.opts.deep ? _.cloneDeep(value) : value;
  }

}
