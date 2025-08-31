import React from "react";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/model/store"
import { fetchCourses } from "./model/thunk";
import { useSelector } from "react-redux";
import { coursesSelector } from "./model/state";
import { Spinner, Toast } from "react-bootstrap";
import { Course } from "./Course";

export const CourseList = () => {
  const dispatch = useAppDispatch();

  const {
    loading,
    error,
    courses
  } = useSelector(coursesSelector);

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Toast show={!!error} className="bg-danger position-fixed m-2">
        <Toast.Body>{error}</Toast.Body>
      </Toast>
      {courses && (
        <div className="d-flex gap-2 flex-column align-items-center my-2">
          {courses.map(c => (
            <Course
              key={c.id}
              {...c}
            />
          ))}
        </div>
      )}
    </>
  )
}
