import { Recognition } from "../entity/recognition.entity";
import { Users } from "../entity/users.entity";


export class UserPagination{
    items: Users[];
    links: {
        first: string,
        last: string,
        next: string,
        previous: string,
    }
    meta: {
        currentPage: number,
        itemCount: number,
        itemsPerPage: number,
        totalItems: number,
        totalPages: number,
    }
}

export class RecognitionPagination{
    items: Recognition[];
    links: {
        first: string,
        last: string,
        next: string,
        previous: string,
    }
    meta: {
        currentPage: number,
        itemCount: number,
        itemsPerPage: number,
        totalItems: number,
        totalPages: number,
    }
}
