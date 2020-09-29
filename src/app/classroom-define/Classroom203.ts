import { Classroom } from './Classroom';

export class Classroom203 implements Classroom {
    readonly Layout = {
        id: "INS203",
        name: "前教室 (203)",
        rows: 6,
        cols: 6,
        scenes: {
            top:    [{name: 'door'}, {name: 'window'}],
            left:   [{name: 'door'}, {name: 'window'}, {name: 'door'}],
            right:  [{name: 'teacher'}, {name: 'whiteboard'}],
            bottom: [{name: 'window'}]
        },
        seats: [
            {row: [0,0,1,1,1,1]},
            {row: [0,0,1,1,1,1]},
            {row: null},
            {row: [1,1,1,1,1,1]},
            {row: [1,1,1,1,1,1]},
            {row: null},
            {row: [1,1,1,1,1,1]},
            {row: [1,1,1,1,1,1]},
        ]
    };
}