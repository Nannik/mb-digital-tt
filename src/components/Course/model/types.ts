export type Course = {
  id: number,
  title: string,
  description: string,
  price: number,
  videoUrl: string | null, // No access - no video. FE shouldn't know link
  loading?: boolean // when payment is loading
}

export type CourseState = {
  loading: boolean,
  error: string | null,

  // In task described that only bought courses stored in state
  // But here all courses stored in state because there is no global variable with courses
  // Bought courses will store videoUrl field
  courses: Course[] 

}
