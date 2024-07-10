import { reactive, watch } from "vue"
import { v4 as uuidv4 } from 'uuid';
import { migrate } from "@/migrations";

migrate()

export type TodoType = 'daily' | 'mandatory'

export type Todo = {
    id: string,
    completed_at: number | null,
    content: string,
    type: TodoType,
    date_group: string | null,
}


const todoStore = reactive({
    todos: [] as Todo[],

    get(date: Date | null) {
        const dateGroup = this._getDateGroup(date ?? new Date())
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
        return this._getDateGroup(new Date())
    },

    _getDateGroup(date: Date) {
        const options = { numberingSystem: 'latn', year: "numeric", month: "2-digit", day: "2-digit" } as Intl.DateTimeFormatOptions
        const group = date.toLocaleDateString('fa-IR', options)

        return group
    },

    addNew(content: string, date: Date | null = null) {
        this.todos.push({
            id: uuidv4(),
            completed_at: null,
            content: content,
            type: date ? 'daily' : 'mandatory',
            // date_group of mandatory todos is null
            date_group: date && this._getDateGroup(date),
        })
    },

    update(id: string, content: string) {
        const index = this.todos.findIndex((a) => a.id == id)
        this.todos[index] = { ...this.todos[index], content }
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