export interface ClassroomObject {
    fromTime?: any,
    toTime?: any,
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