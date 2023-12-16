import {createBrowserRouter} from 'react-router-dom';
import {MainLayout} from './layouts/Main';
import {HomePage} from './pages/Home';
import {StudyPage} from './pages/Study';

const basename = process.env.REACT_APP_BASENAME || '';

export enum Path {
  Home = '/',
  Study = '/study',
}

export const router = createBrowserRouter([
  {
    path: Path.Home,
    element: <MainLayout/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: Path.Study,
        element: <StudyPage/>
      }
    ]
  }
], {
  basename
});
