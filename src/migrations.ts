
export function migrate(): void {
    let temp, todos, index

    temp = localStorage.getItem('v1/todos')
    todos = temp ? JSON.parse(temp) : []

    temp = localStorage.getItem('v1/migrations/index')
    index = temp ? parseInt(temp) : 0

    if (todos) {
        for (; index < migrations.length; index++) {
            todos = migrations[index](todos)
        }
    }

    localStorage.setItem('v1/todos', JSON.stringify(todos))
    localStorage.setItem('v1/migrations/index', `${migrations.length}`)
}

const migrations = [
    // add date_group key
    (todos: any) => {
        return todos.map((el: any) => ({
            ...el,
            date_group: el.date_group ?? null
        }));
    },

    // add type key
    (todos: any) => {
        return todos.map((el: any) => ({
            ...el,
            type: el.type ?? (el.date_group ? 'daily' : 'mandatory')
        }));
    },

]