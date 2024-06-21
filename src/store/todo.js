import { reactive, watch } from "vue"
import { v4 as uuidv4 } from 'uuid';

const store = reactive({
    todos: JSON.parse(localStorage.getItem('v1/todos')) ?? [],

    all() {
        return this.todos
    },

    addNew(content) {
        this.todos.push({
            id: uuidv4(),
            completed_at: null,
            content: content,
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