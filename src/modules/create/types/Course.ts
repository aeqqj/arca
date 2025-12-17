import CourseColors from '@/assets/CourseColors.json'

export type Course = keyof typeof CourseColors // restricting Category to ONLY HAVE courseColors indices 

export interface CourseType {
    course: Course
    selected: boolean
}
