import { reactive, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { migrate } from '@/migrations'
import type { Todo } from '@/types'
import { PersianDate } from '@/class/persiandate'

migrate()

const todoStore = reactive({
  todos: [] as Todo[],

  get(date: PersianDate | null) {
    const dateGroup = (date ?? new PersianDate()).toDateGroup()
    const isToday = dateGroup == this._todayGroup()

    return this.todos.filter((t) => {
      if (t.date_group) {
        return t.date_group == dateGroup
      }

      // todos wihout date_group is mandatory, and have to show only in
      // today page not tomorrow or other days when user swiping
      if (isToday) {
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
      started_at: Date.now(),
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

    // set date group of mandatory todo to today group to prevent
    // repeating it anymore when its completed
    if (todo.type == 'mandatory') {
      if (todo.completed_at == null) {
        todo.date_group = null
      } else {
        todo.date_group = this._todayGroup()
      }
    }
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