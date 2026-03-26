import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Recommendation from './pages/Recommendation';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />
  },
  {
    name: 'Quiz',
    path: '/quiz',
    element: <Quiz />
  },
  {
    name: 'Recommendation',
    path: '/recommendation',
    element: <Recommendation />
  }
];

export default routes;
