import { createSelector } from 'reselect';

const selectUserState = (state) => state.users;

export const selectUsers = createSelector(
  [selectUserState],
  (userState) => userState.users || []
);
