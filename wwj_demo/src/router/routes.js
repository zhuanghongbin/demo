import Index from '@/components/Index'
// import Demo from '@/components/Demo'
import ChildPage from '@/components/ChildPage'

export default [{
    path: '/',
    redirect: '/index'
  },
  {
    path:'/demo/:id',
    props: true, // 把params 设置到页面组件的props中
    // props: (route) => ({id: route.query.b}), // 也可以通过query来设置param
    name: 'demo',
    component: () => import('@/components/Demo'), // 异步组件引入
    meta: { // 页面元信息
      title: 'demo 页面',
      description: '页面介绍'
    },
    children: [ // 嵌套路由
      {
        path: 'test',
        component: ChildPage
      }
    ]
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  }
]

