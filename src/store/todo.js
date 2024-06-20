import { reactive, watch } from "vue"

const store = reactive({
    todos: JSON.parse(localStorage.getItem('v1/todos')) ?? [],

    all() {
        return this.todos
    },

    addNew(content, id = null) {
        this.todos.push({
            id: id ?? Date.now(),
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

    store.addNew('سلام رفیق! من یک برنامه خیلی کوچولو برای مدیریت کار هام', 1)
    store.addNew('هر وقت کاری خواستی اضافه کنی از پایین صفحه جایی که نوشته «کار من» می تونی اضافه کنی', 2)
    store.addNew('وقتی کاری رو تموم کردی روی تیک سمت راستش ضربه بزن تا یک خط روش بکشم', 3)
    store.addNew('اگر لازم شد کاری رو ویرایش کنی اونو به سمت راست هلش بده', 4)
    store.addNew('برای حذف کار هم به سمت چپ حلش بده', 5)

    localStorage.setItem('v1/setting/first-open', 1)
}

export function useTodoStore() {
    return store
}