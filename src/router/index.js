import Vue from 'vue'
import Router from 'vue-router'
import ProjectList from  '../pages/project_list/project_list'
import ProjectSel from  '../pages/project_sel/project_sel'
import ProjectInfo from  '../pages/project_info/project_info'


Vue.use(Router)
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProjectList',
      component: ProjectList,
      meta: {allowBack: false}
    },
    {
      path: '/ProjectSel',
      name: 'ProjectSel',
      component: ProjectSel,
      meta: {allowBack: false}
    },
    {
      path: '/ProjectInfo/:projectNo',
      name: 'ProjectInfo',
      component: ProjectInfo,
      meta: {allowBack: false}
    }
  ]
})
