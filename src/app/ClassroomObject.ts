export interface ClassroomObject {
    fromTime?: Date,
    toTime?: Date,
    questionNum?: number,
    studentRecords?: {
        record: number,
        idNumber: string
    }[],
    waitingQueue?: {
        timeInNumber: number,
        cellId: string,
        roomId: string,
        idNumber: string
    }[]
}