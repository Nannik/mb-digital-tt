import { CourseState } from "../../components/Course/model/types"
import { UserState } from "../../components/User/model/types"
import { VideoState } from "../../components/WatchModal/model/types"

export type TState = {
  coursesState: CourseState,
  userState: UserState
  videoState: VideoState
}

export type ThunkConfig<T> = {
  rejectValue: T
}

