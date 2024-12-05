export type Schedule = 'daily' | 'mandatory'

export type Todo = {
    id: string,
    started_at: number,
    completed_at: number | null,
    content: string,
    type: Schedule,
    date_group: string | null,
}