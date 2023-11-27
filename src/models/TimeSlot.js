export class TimeSlot {
    constructor(id, date, time, isAvailable, isSelected, tutor = null){
        this.id = id;
        this.date = date;
        this.time = time;
        this.isAvailable = isAvailable;
        this.isSelected = isSelected;
        this.tutor = tutor
    }
}