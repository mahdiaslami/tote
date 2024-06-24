import { reactive, watch } from "vue"
import { v4 as uuidv4 } from 'uuid';
import { migrate } from "@/migrations";

migrate()

const store = reactive({
    todos: JSON.parse(localStorage.getItem('v1/todos')) ?? [],

    get(date = null) {
        const dateGroup = this._getDateGroup(date)
        const isToday = dateGroup == this._todayGroup()

        return this.todos.filter((t) => {
            if (t.date_group) {
                return t.date_group == dateGroup
            }

            // only show static todos in today page
            if (isToday) {
                return true
            }

            return false
        })
    },

    _todayGroup() {
        return this._getDateGroup(new Date())
    },

    _getDateGroup(date) {
        const options = { numberingSystem: 'latn', year: "numeric", month: "2-digit", day: "2-digit" }
        const group = date.toLocaleDateString('fa-IR', options)

        return group
    },

    addNew(content, date = null) {
        this.todos.push({
            id: uuidv4(),
            completed_at: null,
            content: content,
            // date_group of static todos is null
            date_group: date ? this._getDateGroup(date) : null,
        })
    },

    update(id, todo) {
        const index = this.todos.findIndex((a) => a.id == id)
        this.todos[index] = todo
    },

    remove(id) {
        const index = this.todos.findIndex((a) => a.id == id)
        this.todos.splice(index, 1)
    },

    truncate() {
        this.todos = []
    },

    toggleCompleted(id) {
        const index = this.todos.findIndex((a) => a.id == id)
        const todo = this.todos[index]
        todo.completed_at = todo.completed_at ? null : Date.now()
        // set date group of static todo to today group to prevent
        // repeating it anymore
        todo.date_group = this._todayGroup()
    },

})

watch(
    store.todos,
    (value) => localStorage.setItem('v1/todos', JSON.stringify(value)),
    { immediate: true }
)

if (!localStorage.getItem('v1/setting/first-open')) {
    store.truncate()

    store.addNew('سلام رفیق! من یک برنامه خیلی کوچولو برای مدیریت کار هام')
    store.addNew('هر وقت کاری خواستی اضافه کنی از پایین صفحه جایی که نوشته «کار من» می تونی اضافه کنی')
    store.addNew('وقتی کاری رو تموم کردی روی تیک سمت راستش ضربه بزن تا یک خط روش بکشم')
    store.addNew('اگر لازم شد کاری رو ویرایش کنی اونو به سمت راست هلش بده')
    store.addNew('برای حذف کار هم به سمت چپ حلش بده')

    localStorage.setItem('v1/setting/first-open', 1)
}

export function useTodoStore() {
    return store
}