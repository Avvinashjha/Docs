export type GetItemRequest = {
    id: number
}

export type Empty = {}

export type SetItemRequest =  {
    title: string,
    description: string,
    price: number,
    discount: number,
    isFeatured: boolean,
    categories: string[] 
}

export type UpdateItemRequest = {
    id: number,
    title: string,
    description: string,
    price: number,
    discount: number,
    isFeatured: boolean,
    categories: string[] 
}

export type Item = {
    id: number,
    title: string,
    description: string,
    price: number,
    discount: number,
    isFeatured: boolean,
    categories: string[] 
}

export type ItemList = {
    items: Item[]
}

export type SuccessResponse = {
    success: boolean,
    message: string
}