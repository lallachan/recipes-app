export type Recipe = {
    id: string,
    title: string,
    dateCreated: string,
    authorId: string,
    instructions: string[],
    tags: string[]
}

export type User = {
    id: string,
    name: string,
    email: string
}
