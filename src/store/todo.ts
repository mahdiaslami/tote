import { reactive, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { migrate } from '@/migrations'
import type { Todo } from '@/types'
import { PersianDate } from '@/class/persiandate'

migrate()

const todoStore = reactive({
  todos: [] as Todo[],

  get(date: PersianDate) {
    const theDate = (date?.duplicate() ?? new PersianDate())

    return this.todos.filter((t) => {
      if (t.type == 'daily') {
        return theDate.isInSameDay(t.started_at)
      }

      if (theDate.isInSameDay(t.started_at)) {
        return true
      }

      if (theDate.isAfter(t.started_at)) {
        if (t.completed_at != null) {
          return theDate.isBefore(t.completed_at)
            || theDate.isInSameDay(t.completed_at)
        }

        return true
      }

      return false
    })
  },

  _todayGroup() {
    return (new PersianDate()).toDateGroup()
  },

  addNew(content: string, date: PersianDate | null = null) {
    this.todos.push({
      id: uuidv4(),
      started_at: date?.getTime() ?? Date.now(),
      completed_at: null,
      content: content,
      type: date ? 'daily' : 'mandatory',
      // date_group of mandatory todos is null
      date_group: date && date.toDateGroup(),
    })
  },

  update(id: string, content: string, date: PersianDate | null = null) {
    const index = this.todos.findIndex((a) => a.id == id)
    const todo = this.todos[index]
    this.todos[index] = {
      id: todo.id,
      started_at: todo.started_at,
      completed_at: null,
      content,
      type: date ? 'daily' : 'mandatory',
      date_group: date && date.toDateGroup(),
    } as Todo
  },

  remove(id: string) {
    const index = this.todos.findIndex((a) => a.id == id)
    this.todos.splice(index, 1)
  },

  truncate() {
    this.todos = []
  },

  toggleCompleted(id: string) {
    const index = this.todos.findIndex((a) => a.id == id)
    const todo = this.todos[index]
    todo.completed_at = todo.completed_at ? null : Date.now()
  },

})

const temp = localStorage.getItem('v1/todos')
todoStore.todos = temp ? JSON.parse(temp) : []

watch(
  todoStore.todos,
  (value) => localStorage.setItem('v1/todos', JSON.stringify(value)),
  { immediate: true }
)

if (!localStorage.getItem('v1/setting/first-open')) {
  todoStore.truncate()

  todoStore.addNew('سلام رفیق! من یک برنامه خیلی کوچولو برای مدیریت کار هام')
  todoStore.addNew('هر وقت کاری خواستی اضافه کنی از پایین صفحه جایی که نوشته «کار من» می تونی اضافه کنی')
  todoStore.addNew('وقتی کاری رو تموم کردی روی تیک سمت راستش ضربه بزن تا یک خط روش بکشم')
  todoStore.addNew('اگر لازم شد کاری رو ویرایش کنی اونو به سمت راست هلش بده')
  todoStore.addNew('برای حذف کار هم به سمت چپ حلش بده')

  localStorage.setItem('v1/setting/first-open', '1')
}

export function useTodoStore() {
  return todoStore
}