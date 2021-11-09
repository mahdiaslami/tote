
const database = document.location.pathname.split('/').pop()
document.title = `Todo: ${database}`

var app = new Vue({
    el: '#app',
    data() {
        return {
            newTodo: '',
            todos: this.getFromLocalStorage() ?? [],
            currentId: -1
        }
    },

    watch: {
        todos() {
            this.saveToLocalStorage()
        }
    },

    methods: {
        select(id) {
            if (this.currentId === id) {
                this.currentId = -1
            } else {
                this.currentId = id
            }
        },

        saveTodo() {
            this.todos.push(this.createTodo())
            this.newTodo = ''
        },

        createTodo() {
            return {
                id: new Date().getTime(),
                text: this.newTodo,
                completed: false
            }
        },

        complete(id) {
            const todo = this.todos.find((todo) => todo.id === id)
            todo.completed = !todo.completed
            this.saveToLocalStorage()
        },

        deleteTodo(id) {
            const index = this.todos.findIndex((todo) => todo.id === id)
            this.todos.splice(index, 1)
        },

        saveToLocalStorage() {
            localStorage.setItem(database, JSON.stringify(this.todos))
        },

        getFromLocalStorage() {
            return JSON.parse(localStorage.getItem(database))
        }
    }
})
