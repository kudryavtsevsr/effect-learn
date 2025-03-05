import { firebaseAPI } from './firebaseAPI';
import { fakeAPI } from './fakeAPI';
import { indexedDBAPI } from './indexedDBAPI';

const repoType = process.env.REACT_APP_REPO_TYPE || 'indexeddb';

export const getAPI = () => {
  switch (repoType.toLowerCase()) {
    case 'firebase':
      return firebaseAPI;
    case 'fake':
      return fakeAPI;
    case 'indexeddb':
      return indexedDBAPI;
    default:
      console.warn(`Unknown repository type: ${repoType}, falling back to IndexedDB`);
      return indexedDBAPI;
  }
}; 