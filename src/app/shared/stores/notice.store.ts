import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { NoticeInterface } from '../inteface/notice.interface';

export interface ListCategory {
  notice: NoticeInterface | null;
  stateNotice: boolean;
}

const initialize: ListCategory = {
  notice: null,
  stateNotice: true,
};

export const NoticeStore = signalStore(
  { providedIn: 'root' },
  withState(initialize),
  withMethods(({ notice, ...store }) => ({
    addNotice(notice: NoticeInterface) {
      patchState(store, { notice: notice });
    },
    addState(state: boolean) {
      patchState(store, { stateNotice: state });
    },
  }))
);
