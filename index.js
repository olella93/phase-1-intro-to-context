// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
	return {
		firstName: firstName,
		familyName: familyName,
		title: title,
		payPerHour: payPerHour,
		timeInEvents: [],
		timeOutEvents: []
	};
}

function createEmployeeRecords(employeeData) {
	return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateTime) {
	const [date, hour] = dateTime.split(' ');

	employeeRecord.timeInEvents.push({
		type: "TimeIn",
		date: date,
		hour: parseInt(hour, 10)
	});

	return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTime) {
	const [date, hour] = dateTime.split(' ');

	employeeRecord.timeOutEvents.push({
		type: "TimeOut",
		date: date,
		hour: parseInt(hour, 10)
	});

	return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
	const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
	const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

	if (timeInEvent && timeOutEvent) {
		return (timeOutEvent.hour - timeInEvent.hour) / 100;
	} else {
		return 0;
	}
}

function wagesEarnedOnDate(employeeRecord, date) {
	const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
	return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
	return employeeRecord.timeInEvents.reduce((total, timeInEvent) => {
		return total + wagesEarnedOnDate(employeeRecord, timeInEvent.date);
	}, 0);
}

function calculatePayroll(employeeRecords) {
	return employeeRecords.reduce((total, employeeRecord) => {
		return total + allWagesFor(employeeRecord);
	}, 0);
}