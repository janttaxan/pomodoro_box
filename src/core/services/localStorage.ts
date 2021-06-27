import { RootState } from 'core/entities/store';

export class LocalStorageService {
  public loadState(): Optional<RootState> {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return null;
      }
      return JSON.parse(serializedState) as RootState;
    } catch (err) {
      return null;
    }
  }

  public saveStore(state: RootState) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch {
      // ignore write errors
    }
  }
}
