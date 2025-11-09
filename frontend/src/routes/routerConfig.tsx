import type { RouteObject } from 'react-router-dom'

export const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <div>StudyNotion</div>,
    children: [
      {
        index: true,
        element: <div>HomePage</div>,
      },
    ],
  },
]
