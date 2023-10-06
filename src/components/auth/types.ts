export  type LoginType = {
    email?: string;
    password?: string;
};

export type RegisterType = {
    name?: string;
    email?: string;
    password?: string;
};

export type RecipeType = {
    title?: string;
    dateCreated?: string;
    authorId: string,
    instructions: string[],
    tags: string[]
};
