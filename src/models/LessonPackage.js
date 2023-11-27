export class LessonPackage {
  constructor(duration, totalSessions, leftdays, text) {
    this.duration = duration;
    this.totalSessions = totalSessions;
    this.remaining = totalSessions;
    this.leftdays = leftdays;
    this.text = text;
  }
}
