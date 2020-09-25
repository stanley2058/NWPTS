import { Component, Input, OnInit } from '@angular/core';
import { Classroom } from '../classroom-define/Classroom';
import { ClassroomDefine } from '../classroom-define/ClassroomDefine';

@Component({
  selector: 'app-classroom-renderer',
  templateUrl: './classroom-renderer.component.html',
  styleUrls: ['./classroom-renderer.component.sass']
})
export class ClassroomRendererComponent implements OnInit {
  @Input('classroom') classroom: Classroom;
  classroomRowCount = 0;
  classroomColumnCount = 0;

  constructor() { }

  ngOnInit(): void {
    console.log(this.classroom);
  }

  getSceneRenderList(entities: {name: string, occupie?: number}[]) {
    const assignList: {name: string, from: number, to: number}[] = [];
    const assignListReverse: {name: string, from: number, to: number}[] = [];
    const list = [];

    for (let i = 0, index = 0; i < this.classroom.Layout.cols;) {
      const len = entities[index].occupie ? entities[index].occupie : ClassroomDefine.Entities[entities[index].name].occupie - 1;
      if (len < 0) {
        assignList.push({
          name: entities[index].name,
          from: i,
          to: this.classroom.Layout.cols
        });
        i = this.classroom.Layout.cols;
      } else {
        assignList.push({
          name: entities[index].name,
          from: i,
          to: i + len
        });
        i += len + 1;
        ++index;
      }
    }
    for (let i = this.classroom.Layout.cols, index = entities.length - 1; i >= 0;) {
      const len = entities[index].occupie ? entities[index].occupie : ClassroomDefine.Entities[entities[index].name].occupie - 1;
      if (len < 0) {
        assignListReverse.push({
          name: entities[index].name,
          from: 0,
          to: i
        });
        i = -1;
      } else {
        assignListReverse.push({
          name: entities[index].name,
          from: i - len,
          to: i
        });
        i -= len + 1;
        --index;
      }
    }

    assignListReverse.sort((a, b) => a.from - b.from);

    let isSame = true;
    for (let i = 0; i < assignList.length; ++i) {
      if (
        assignList[i].name !== assignListReverse[i].name ||
        assignList[i].from !== assignListReverse[i].from ||
        assignList[i].to !== assignListReverse[i].to
      ) {
        isSame = false;
        break;
      }
    }

    if (!isSame) {
      for (let i = assignListReverse.length - 1, j = assignList.length - 1; i >= 0;) {
        const current = assignListReverse[i];
        if (current.from - current.to === 0) {
          if (assignList[j].from - assignList[j].to === 0 && assignList[j].to >= current.from) {
            throw new Error(`Bad Classroom Scene Layout. Not renderable: ${assignList[j].name} overlap ${current.name}.`);
          }
          assignList.push(current);
          if (assignList[j].to >= current.from) assignList[j].to = current.from - 1;
          --i;
        } else {
          if (current.name !== assignList[j].name) throw new Error(`Bad Classroom Scene Layout. Not renderable: ${assignList[j].name} conflict with ${current.name}.`);
          assignList[j].to = current.to;
          break;
        }
      }
    }

    for (const obj of assignList)
      for (let i = obj.from; i <= obj.to; ++i)
        list[i] = obj.name;
    return list;
  }
}
