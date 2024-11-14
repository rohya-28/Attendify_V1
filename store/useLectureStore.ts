// store.ts (Zustand store)
import { create } from 'zustand'

interface Lecture {
  _id: string
  subject: string
  teacherId: string
  startTime: string
  endTime: string
  dayOfWeek: string
  duration: number
  createdAt: string
  updatedAt: string
  __v: number
}

interface Store {
  lectures: Lecture[]
  setLectures: (lectures: Lecture[]) => void
  addLecture: (lecture: Lecture) => void
  updateLecture: (lectureId: string, updatedLecture: Partial<Lecture>) => void
  clearLectures: () => void
}

const useLectureStore = create<Store>((set) => ({
  lectures: [], // Initialize as an empty array
  setLectures: (lectures) => set({ lectures }),
  addLecture: (lecture) =>
    set((state) => ({ lectures: [...state.lectures, lecture] })),
  updateLecture: (lectureId, updatedLecture) =>
    set((state) => ({
      lectures: state.lectures.map((lecture) =>
        lecture._id === lectureId ? { ...lecture, ...updatedLecture } : lecture
      ),
    })),
  clearLectures: () => set({ lectures: [] }),
}))

export default useLectureStore
