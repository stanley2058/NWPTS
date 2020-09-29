import { Classroom } from './Classroom';

export class Classroom201 implements Classroom {
    readonly Layout = {
        id: "INS201",
        name: "後教室 (201)",
        rows: 6,
        cols: 6,
        scenes: {
            top:    [{name: 'door'}, {name: 'window'}, {name: 'door'}],
            left:   [{name: 'whiteboard'}],
            right:  [{name: 'door'}, {name: 'window'}, {name: 'door'}],
            bottom: [{name: 'window'}]
        },
        seats: [
            {row: [1,1,1,1,1,1]},
            {row: [1,1,1,1,1,1]},
            {row: null},
            {row: [1,1,1,1,1,1]},
            {row: [1,1,1,1,1,1]},
            {row: null},
            {row: [1,1,1,1,1,1]},
            {row: [1,1,1,1,1,1]},
        ]
    };
}