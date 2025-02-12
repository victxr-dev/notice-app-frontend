import { CategoryInterface } from '../inteface/category.interface';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { NoticeInterface } from '../inteface/notice.interface';

export interface ListCategory {
  noticesCategory: NoticeInterface[];
  stateCategory: boolean;
}

const initialize: ListCategory = {
  noticesCategory: [],
  stateCategory: true,
};

export const CategoryStore = signalStore(
  { providedIn: 'root' },
  withState(initialize),
  withMethods(({ noticesCategory, ...store }) => ({
    addCategory(category: NoticeInterface[]) {
      patchState(store, { noticesCategory: category });
    },
    addState(state: boolean) {
      patchState(store, { stateCategory: state });
    },
  }))
);
