
var ical = require('../icalendar');

var formatter = ical.CalendarFormatter(process.stdout, '-//icalendar/cal//NONSGML v1.0//EN');

formatter.writeEvent({
			 uid: 'uid',
			 dtstamp: new Date(),
			 dtstart: new Date(),
			 dtend: new Date(),
			 summary: 'Example event'
});

formatter.end();
