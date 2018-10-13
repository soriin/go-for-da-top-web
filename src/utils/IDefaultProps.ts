import { IAppState } from '../states/appState';
import { RouteComponentProps } from 'react-router-dom';

export interface IDefaultProps {
  appState: IAppState,
}

export interface IPageDefaultProps extends IDefaultProps, RouteComponentProps<any> {
}