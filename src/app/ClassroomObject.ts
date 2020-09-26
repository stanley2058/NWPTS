export interface ClassroomObject {
    fromTime: Date,
    toTime: Date,
    questionNum: number,
    studentRecords: {
        record: number,
        idNumber: string
    }[],
    waitingQueue: {
        cellId: string,
        roomId: string,
        idNumber: string
    }[]
}