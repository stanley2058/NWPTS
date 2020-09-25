export interface Classroom {
    readonly Layout: {
        id: string,
        name: string,
        rows: number,
        cols: number,
        scenes: {
            top:    {name: string, occupie?: number}[],
            left:   {name: string, occupie?: number}[],
            right:  {name: string, occupie?: number}[],
            bottom: {name: string, occupie?: number}[]
        },
        seats: {row: number[]}[]
    };
}