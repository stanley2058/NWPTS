# NTOU Web Programming TA System
*This project is created for the Web Programming class.*

![](NWPTS.png)

- [NTOU Web Programming TA System](#ntou-web-programming-ta-system)
  * [Using](#using)
  * [Build And Deploy](#build-and-deploy)
  * [Run Angular Dev Server](#run-angular-dev-server)
  * [Customize Classroom Layout](#customize-classroom-layout)


## Using
- Angular
- Angular Material
- Angularfire
- Firebase


## Build And Deploy
1. Replace the Firebase project tokens in `app.modules.ts`
2. The **Firestore** collection name should be **classroom-session**, or you can change all the collection names in `classroom-service.service.ts`
3. `ng deploy`


## Run Angular Dev Server
1. `npm i -g @angular/cli`
2. `npm i`
3. `ng serve --open`


## Customize Classroom Layout
1. Implement the Classroom interface.
    ```typescript
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
    ```
2. Define your own classroom layout. Example: Classroom 203
    ```typescript
    import { Classroom } from './Classroom';

    export class Classroom203 implements Classroom {
        readonly Layout = {
            id: "INS203", // classroom id
            name: "前教室 (203)", // display name
            rows: 6, // row count for rendering
            cols: 6, // column count for rendering
            scenes: {
                // scenes's schema should be as following, pre-defined scene objects are listed in ClassroomDefine

                // top: upper wall while displaying
                top:    [{name: 'door'}, {name: 'window'}],
                // left: left wall while displaying
                left:   [{name: 'door'}, {name: 'window'}, {name: 'door'}],
                // right: right wall while desplaying
                right:  [{name: 'teacher'}, {name: 'whiteboard'}],
                // bottom: bottom wall while desplaying
                bottom: [{name: 'window'}]
            },
            seats: [
                // 0: space
                // 1: seat
                // null: walk way

                {row: [0,0,1,1,1,1]},
                {row: [0,0,1,1,1,1]},
                {row: null},
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
    ```
    ```typescript
    // define: 'name': {occupie: space}
    // space: space occupied in table, if space is -1, the scene object will expand ot fit remaining space.
    export class ClassroomDefine {
        static readonly Entities = {
            'teacher':      {occupie: 1},
            'door':         {occupie: 1},
            'window':       {occupie: -1},
            'blackboard':   {occupie: -1},
            'whiteboard':   {occupie: -1},
            'seat':         {occupie: 1},
            'space':        {occupie: 1},
        };
    }
    ```
3. Change the `classrooms` list in `classroom.component.ts` and `classroom-manage.component.ts`, create the classrooms you want to show in the selection in the `classrooms` list and remove the one you don't need:
    ```typescript
    classrooms: Classroom[] = [new Classroom203(), new Classroom201()];
    ```
