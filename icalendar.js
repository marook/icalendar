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

    function writeField(fieldId, obj){
	var val = getFieldValue(fieldId, obj);

	if(val === undefined){
	    return;
	}

	out.write(fieldId);
	out.write(':');
	out.write(val);
	out.write('\n');
    }

    function writeEvent(event){
	out.write('BEGIN:VEVENT\n');

	writeField('UID', event);
	writeField('SUMMARY', event);

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
