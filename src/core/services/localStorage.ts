import { RootState } from 'core/entities/store';

export class LocalStorageService {
  private key = 'state';

  public loadState(): Optional<RootState> {
    try {
      const serializedState = localStorage.getItem(this.key);
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
      localStorage.setItem(this.key, serializedState);
    } catch {
      // ignore write errors
    }
  }

  public resetStore() {
    try {
      localStorage.removeItem(this.key);
    } catch {
      // ignore write errors
    }
  }
}
