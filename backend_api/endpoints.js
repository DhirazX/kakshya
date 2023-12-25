var base_url = 'http://127.0.0.1:8000/api/user';

const API_ENDPOINTS = {
    register: '/register/',
    login: '/login/',
    profile: '/profile/',
    changePassword: '/change-password/',
    tokenRefresh: '/token/refresh/',
    createClass: '/class/create/',
    viewClassList: '/class/list/',
    deleteClass: '/class/delete/',//need to pass id here
    createClassRecord: '/class-record/create/',
    viewClassRecordList: '/class-record/list/',
    viewClassRecord: '/class-record/', //need to pass id here
    updateClassRecord: '/class-record/update/', //need to pass id here
    deleteClassRecord: '/class-record/delete/', //need to pass id here
};