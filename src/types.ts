export type Schedule = 'daily' | 'mandatory'

export type Todo = {
    id: string,
    completed_at: number | null,
    content: string,
    type: Schedule,
    date_group: string | null,
}