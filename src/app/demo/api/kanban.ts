export interface KanbanCard {
    id: string;
    title?: string;
    description?: string;
    progress?: number;
    assignees?: Assignee[];
    attachments?: number;
    comments?: Comment[];
    startDate?: string;
    dueDate?: string;
    completed?: boolean;
    priority?: Object;
    commentList: CommentList;
}

export interface KanbanList {
    listId: string;
    title?: string;
    cards: KanbanCard[];
}

export interface Comment {
    id?: string;
    name: string;
    image?: string;
    text: string;
}

export interface ListName {
    listId?: string;
    title: string;
}

export interface CommentList {
    id?: string;
    title: string;
    tasks: Task[];
}

export interface Task {
    text: string;
    completed: boolean;
}

export interface Assignee {
    name: string;
    image: string;
}