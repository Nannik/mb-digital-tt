export type Course = {
  id: string,
  title: string,
  description: string,
  price: number,
  videoUrl: string | null, // No access - no video. FE shouldn't know link
}

export type CourseState = {
  loading: boolean,
  error: string | null,
  courses: Course[]
}
