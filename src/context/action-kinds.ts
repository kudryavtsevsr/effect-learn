export const repoActionKind = {
  getTermsList: 'get-terms-list',
  addTermToList: 'add-term-to-list',
  editTermInList: 'edit-term-in-list',
  removeTermFromList: 'remove-term-from-list',
  showLoader: 'show-loader',
  hideLoader: 'hide-loader'
};

export type RepoActionKindKeys = keyof typeof repoActionKind;
export type RepoActionKindValues = typeof repoActionKind[RepoActionKindKeys];
