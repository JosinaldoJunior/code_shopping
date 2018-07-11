export interface Category{
    id?: number;
    name: string;
    readonly slug?: string;
    active: boolean;
    readonly created_at?: {date: string};
    readonly updated_at?: {date: string};
}