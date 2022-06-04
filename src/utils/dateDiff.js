function dateDiff(date1, date2) {
    // To calculate the time difference of two dates
    var Difference_In_Time = date1.getTime() - date2.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Difference_In_Days
}

export default dateDiff;