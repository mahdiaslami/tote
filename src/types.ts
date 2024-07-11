export type TodoType = 'daily' | 'mandatory'

export type Todo = {
    id: string,
    completed_at: number | null,
    content: string,
    type: TodoType,
    date_group: string | null,
}