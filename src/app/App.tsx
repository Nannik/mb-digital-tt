import React from 'react';
import { CourseList } from '../components/Course/CourseList';
import { Provider } from 'react-redux';
import { store } from './model/store';
import { WatchModal } from '../components/WatchModal/WatchModal';

export const App = () => {
  return (
    <Provider store={store}>
      <CourseList />
      <WatchModal />
    </Provider>
  )
}
