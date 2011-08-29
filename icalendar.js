/*
 * Copyright 2011 Markus Pielmeier
 *
 * This file is part of iCalendar.
 *
 * iCalendar is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * iCalendar is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with iCalendar.  If not, see <http://www.gnu.org/licenses/>.
 */

function CalendarFormatter(out, prodId){
    out.write('BEGIN:VCALENDAR\n');
    out.write('VERSION:2.0\n');

    out.write('PRODID:');
    out.write(prodId);
    out.write('\n');

    function getFieldValue(fieldId, obj){
	var val = obj[fieldId];

	if(val !== undefined){
	    return val;
	}

	val = obj[fieldId.toLowerCase()];

	return val;
    }

    function stringFormatter(s){
	return s;
    }

    function pad(val, len){
	var s = '' + val;

	while(s.length < len){
	    s = '0' + s;
	}

	return s;
    }

    function dateFormatter(d){
	return pad(d.getUTCFullYear(), 4) + pad(d.getUTCMonth() + 1, 2) + pad(d.getUTCDate(), 2) + 'T' + pad(d.getUTCHours(), 2) + pad(d.getUTCMinutes(), 2) + pad(d.getUTCSeconds(), 2) + 'Z';
    }

    function writeField(fieldId, obj, fieldFormatter){
	var val = getFieldValue(fieldId, obj);

	if(val === undefined){
	    return;
	}

	out.write(fieldId);
	out.write(':');
	out.write(fieldFormatter(val));
	out.write('\n');
    }

    function writeEvent(event){
	out.write('BEGIN:VEVENT\n');

	writeField('UID', event, stringFormatter);
	writeField('DTSTAMP', event, dateFormatter);
	writeField('DTSTART', event, dateFormatter);
	writeField('DTEND', event, dateFormatter);
	writeField('SUMMARY', event, stringFormatter);

	out.write('END:VEVENT\n');
    }

    function end(){
	out.write('END:VCALENDAR\n');
    }

    return {
	writeEvent: writeEvent,

	    end: end
	 
    };
}

exports.CalendarFormatter = CalendarFormatter;
