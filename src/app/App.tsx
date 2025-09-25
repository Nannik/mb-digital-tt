import React, { useEffect } from 'react';
import { CourseList } from '../components/Course/CourseList';
import { useAppDispatch } from './model/store';
import { WatchModal } from '../components/WatchModal/WatchModal';
import { LoginForm } from '../components/User/LoginForm';
import { userActions } from '../components/User/model/state';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.init());
  }, [])

  return (
    <>
      <div className='d-flex gap-2 flex-direction-row justify-content-center'>
        <LoginForm />
        <CourseList />
      </div>
      <WatchModal />
    </>
  )
}
