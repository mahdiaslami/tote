
export function migrate() {
    let todos = JSON.parse(localStorage.getItem('v1/todos')) ?? []
    let index = localStorage.getItem('v1/migrations/index')
    index = index ? parseInt(index) : 0

    if (todos) {
        for (; index < migrations.length; index++) {
            todos = migrations[index](todos)
        }
    }

    localStorage.setItem('v1/todos', JSON.stringify(todos))
    localStorage.setItem('v1/migrations/index', migrations.length)
}

const migrations = [
    // add date_group key
    (todos) => {
        return todos.map(el => ({
            ...el,
            date_group: el.date_group ?? null
        }));
    },

    // add type key
    (todos) => {
        return todos.map(el => ({
            ...el,
            type: el.type ?? (el.date_group ? 'daily' : 'mandatory')
        }));
    },

]