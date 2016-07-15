export class ScheduleParams {
  t1: number;
  t2: number;
  inc: string;
  constructor(t1: number, t2: number, inc?: string) {
    this.t1 = t1;
    this.t2 = t2;
    this.inc = inc;
  }

}
