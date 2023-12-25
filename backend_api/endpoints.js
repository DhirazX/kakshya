var base_url = 'http://127.0.0.1:8000/api/user';

const API_ENDPOINTS = {
    register: '/register/',
    login: '/login/',
    profile: '/profile/',
    changePassword: '/change-password/',
    tokenRefresh: '/token/refresh/',
    createClass: '/class/create/',
    viewClassList: '/class/list/',
    deleteClass: '/class/delete/<int:class_id>/',
    createClassRecord: '/class-record/create/',
    viewClassRecordList: '/class-record/list/',
    viewClassRecord: '/class-record/<int:class_id>/',
    updateClassRecord: '/class-record/update/<int:class_id>/',
    deleteClassRecord: '/class-record/delete/<int:class_id>/',
};