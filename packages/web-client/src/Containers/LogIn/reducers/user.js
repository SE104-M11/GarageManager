import * as types from '../Constants'

const user=JSON.parse(localStorage.getItem('user'));
const initialState={
    tenTaiKhoan:user?user.tenTaiKhoan:'',
    email:user?user.email:'',
    quyenHan:user?user.quyenHan:-1
};

const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.GET_USER:
            console.log('action',action.user)
            const user={
                tenTaiKhoan:action.user.tenTaiKhoan,
                email:action.user.email,
                quyenHan:action.user.quyenHan
            }
            localStorage.setItem("user",JSON.stringify(user));
            localStorage.setItem("token",JSON.stringify(action.user.accessToken))
            return action.user;
        case types.LOG_OUT:
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            return {};
        default:
            return state;
    }
}

export default userReducer;