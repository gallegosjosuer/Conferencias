export class Conference {
  public title;
  public description;
  public schedules;

  constructor() {
    this.title = '';
    this.description = '';
    this.schedules = new Array(Schedules);
  }
}

class Schedules {
  public date;
  public start;
  public end;
  public place;
  public speaker;

  constructor() {
    this.date = new Date();
    this.start = '';
    this.end = '';
    this.place = '';
    this.speaker = '';
  }
}