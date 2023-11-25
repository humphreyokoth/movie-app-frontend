import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import Register from '../Register/Register';
import './AuthWrapper.scss';

const AuthWrapper = () => {
    const dispatch = useDispatch();
    const loginVisible = useSelector(selectLoginVisible);
    const onSubmitLogin = (data)=>dispatch(loginUser(data));
    const clearErrorStateLogin = dispatch(clearState());

    const onSubmitRegister = (data)=>dispatch(registerUser(data));
    const clearErrorStateRegister =() =>dispatch(clearState());   
  return (
    <div className='auth-wrapper'>
        {loginVisible ? (
            <login onSubmit={onSubmitLogin} isFetching={isFetching} clearState(clearErrorStateLogin)/>
        ):(
        <Register onSubmit={onSubmitRegister} isFetching={isFetching} clearState(clearErrorStateRegister)/>
        )}
    </div>
  )
}

export default AuthWrapper