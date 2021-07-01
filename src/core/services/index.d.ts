import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from 'core/entities/store';
import { Action } from 'redux';

export type MainThunkAction = ThunkAction<void, RootState, unknown, Action<string>>;

export type MainThunkDispatch = ThunkDispatch<RootState, unknown, Action<string>>;
