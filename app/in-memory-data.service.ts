export class InMemoryDataService {
  createDb() {
    // Remove extra keys from use_blocks (Sat Jun 25 '16)[ 1:29pm] 
    let jsString = '{"ZTimeHeaderDay_-8":[{"blk":{"starttime":1466319600,"endtime":1466406000,"title":"Sun, Jun 19","css_classes":"ZTimeHeaderDayRow "}},{"blk":{"starttime":1466406000,"endtime":1466492400,"title":"Mon, Jun 20","css_classes":"ZTimeHeaderDayRow "}}],"ZTimeHeaderDay_-5":[{"blk":{"starttime":1466308800,"endtime":1466395200,"title":"Sun, Jun 19","css_classes":"ZTimeHeaderDayRow "}},{"blk":{"starttime":1466395200,"endtime":1466481600,"title":"Mon, Jun 20","css_classes":"ZTimeHeaderDayRow "}}],"ZTimeHeaderHour_-8":[{"blk":{"starttime":1466337600,"endtime":1466341200,"title":"5:00","css_classes":"ZTimeHeaderHourRow niteTimeblock "}},{"blk":{"starttime":1466341200,"endtime":1466344800,"title":"6:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466344800,"endtime":1466348400,"title":"7:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466348400,"endtime":1466352000,"title":"8:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466352000,"endtime":1466355600,"title":"9:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466355600,"endtime":1466359200,"title":"10:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466359200,"endtime":1466362800,"title":"11:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466362800,"endtime":1466366400,"title":"12:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466366400,"endtime":1466370000,"title":"1:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466370000,"endtime":1466373600,"title":"2:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466373600,"endtime":1466377200,"title":"3:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466377200,"endtime":1466380800,"title":"4:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466380800,"endtime":1466384400,"title":"5:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466384400,"endtime":1466388000,"title":"6:00","css_classes":"ZTimeHeaderHourRow niteTimeblock "}},{"blk":{"starttime":1466388000,"endtime":1466391600,"title":"7:00","css_classes":"ZTimeHeaderHourRow niteTimeblock "}},{"blk":{"starttime":1466391600,"endtime":1466395200,"title":"8:00","css_classes":"ZTimeHeaderHourRow niteTimeblock "}}],"ZTimeHeaderHour_-5":[{"blk":{"starttime":1466337600,"endtime":1466341200,"title":"8:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466341200,"endtime":1466344800,"title":"9:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466344800,"endtime":1466348400,"title":"10:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466348400,"endtime":1466352000,"title":"11:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466352000,"endtime":1466355600,"title":"12:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466355600,"endtime":1466359200,"title":"1:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466359200,"endtime":1466362800,"title":"2:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466362800,"endtime":1466366400,"title":"3:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466366400,"endtime":1466370000,"title":"4:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466370000,"endtime":1466373600,"title":"5:00","css_classes":"ZTimeHeaderHourRow dayTimeblock "}},{"blk":{"starttime":1466373600,"endtime":1466377200,"title":"6:00","css_classes":"ZTimeHeaderHourRow niteTimeblock "}},{"blk":{"starttime":1466377200,"endtime":1466380800,"title":"7:00","css_classes":"ZTimeHeaderHourRow niteTimeblock "}},{"blk":{"starttime":1466380800,"endtime":1466384400,"title":"8:00","css_classes":"ZTimeHeaderHourRow niteTimeblock "}},{"blk":{"starttime":1466384400,"endtime":1466388000,"title":"9:00","css_classes":"ZTimeHeaderHourRow niteTimeblock "}},{"blk":{"starttime":1466388000,"endtime":1466391600,"title":"10:00","css_classes":"ZTimeHeaderHourRow niteTimeblock "}},{"blk":{"starttime":1466391600,"endtime":1466395200,"title":"11:00","css_classes":"ZTimeHeaderHourRow niteTimeblock "}}],"MetroSummary_1":[{"blk":{"starttime":1466348400,"endtime":1466352000,"metro_id":1,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.0,"title":" 0"}},{"blk":{"starttime":1466352000,"endtime":1466355600,"title":"27","metro_id":1,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.27777777777777773}},{"blk":{"starttime":1466355600,"endtime":1466359200,"title":"37","metro_id":1,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.37037037037037035}},{"blk":{"starttime":1466359200,"endtime":1466362800,"title":"125","metro_id":1,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":1.25}},{"blk":{"starttime":1466362800,"endtime":1466366400,"title":"125","metro_id":1,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":1.25}},{"blk":{"starttime":1466366400,"endtime":1466370000,"title":"104","metro_id":1,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":1.0416666666666667}},{"blk":{"starttime":1466370000,"endtime":1466373600,"title":"111","metro_id":1,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":1.111111111111111}},{"blk":{"starttime":1466373600,"endtime":1466377200,"title":"55","metro_id":1,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.5555555555555556}},{"blk":{"starttime":1466377200,"endtime":1466380800,"title":"41","metro_id":1,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.41666666666666663}},{"blk":{"starttime":1466380800,"endtime":1466384400,"title":"55","metro_id":1,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.5555555555555556}},{"blk":{"starttime":1466384400,"endtime":1466388000,"title":"27","metro_id":1,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.2777777777777778}},{"blk":{"starttime":1466388000,"endtime":1466391600,"title":" 0","metro_id":1,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.0}},{"blk":{"starttime":1466391600,"endtime":1466395200,"metro_id":1,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.0,"title":" 0"}}],"MetroSummary_4":[{"blk":{"starttime":1466348400,"endtime":1466352000,"metro_id":4,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.0,"title":" 0"}},{"blk":{"starttime":1466352000,"endtime":1466355600,"metro_id":4,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.0,"title":" 0"}},{"blk":{"starttime":1466355600,"endtime":1466359200,"title":"126","metro_id":4,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":1.2654308333333324}},{"blk":{"starttime":1466359200,"endtime":1466362800,"title":"108","metro_id":4,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":1.0846549999999993}},{"blk":{"starttime":1466362800,"endtime":1466366400,"title":"157","metro_id":4,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":1.5740725555555546}},{"blk":{"starttime":1466366400,"endtime":1466370000,"title":"11","metro_id":4,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.1111111111111111}},{"blk":{"starttime":1466370000,"endtime":1466373600,"title":"11","metro_id":4,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.1111111111111111}},{"blk":{"starttime":1466373600,"endtime":1466377200,"title":"16","metro_id":4,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.16666666666666666}},{"blk":{"starttime":1466377200,"endtime":1466380800,"title":"18","metro_id":4,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.18518518518518517}},{"blk":{"starttime":1466380800,"endtime":1466384400,"title":" 0","metro_id":4,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.0}},{"blk":{"starttime":1466384400,"endtime":1466388000,"metro_id":4,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.0,"title":" 0"}},{"blk":{"starttime":1466388000,"endtime":1466391600,"metro_id":4,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.0,"title":" 0"}},{"blk":{"starttime":1466391600,"endtime":1466395200,"metro_id":4,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.0,"title":" 0"}}],"MetroSummary_8":[{"blk":{"starttime":1466337600,"endtime":1466341200,"metro_id":8,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.0,"title":" 0"}},{"blk":{"starttime":1466341200,"endtime":1466344800,"title":"55","metro_id":8,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.555555}},{"blk":{"starttime":1466344800,"endtime":1466348400,"title":"55","metro_id":8,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.555555}},{"blk":{"starttime":1466348400,"endtime":1466352000,"title":"18","metro_id":8,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.185185}},{"blk":{"starttime":1466352000,"endtime":1466355600,"title":"12","metro_id":8,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.12345666666666666}},{"blk":{"starttime":1466355600,"endtime":1466359200,"title":"24","metro_id":8,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.24691333333333332}},{"blk":{"starttime":1466359200,"endtime":1466362800,"title":"55","metro_id":8,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.555555}},{"blk":{"starttime":1466362800,"endtime":1466366400,"title":"74","metro_id":8,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.7407400000000001}},{"blk":{"starttime":1466366400,"endtime":1466370000,"title":"185","metro_id":8,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":1.85185}},{"blk":{"starttime":1466370000,"endtime":1466373600,"title":"148","metro_id":8,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":1.4814800000000001}},{"blk":{"starttime":1466373600,"endtime":1466377200,"title":" 0","metro_id":8,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.0}},{"blk":{"starttime":1466377200,"endtime":1466380800,"metro_id":8,"css_classes":"MetroSummaryRow LoadCapSummaryblock ","total_capacity_usage":0.0,"title":" 0"}}],"meta":{"rsrcs":[{"tag":"ZTimeHeaderDay_-8","title":"-8","label":"Day"},{"tag":"ZTimeHeaderHour_-8","title":"-8","label":"Hour"},{"tag":"MetroSummary_1","title":"San Francisco","label":1},{"tag":"MetroSummary_4","title":"San Jose","label":4},{"tag":"ZTimeHeaderDay_-5","title":"-5","label":"Day"},{"tag":"ZTimeHeaderHour_-5","title":"-5","label":"Hour"},{"tag":"MetroSummary_8","title":"Washington, D.C.","label":8}],"min_time":1465759410,"max_time":1466969010,"t1":1466337600,"t2":1466424000,"inc":null}}';

    // This VVVVVVVV matches url 'app/schedule'
    return {schedule: JSON.parse(jsString)};
  }
}
