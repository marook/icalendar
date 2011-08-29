
var ical = require('../icalendar');

var formatter = ical.CalendarFormatter(process.stdout, '-//icalendar/cal//NONSGML v1.0//EN');

formatter.writeEvent({
			 uid: 'uid'
});

formatter.end();
