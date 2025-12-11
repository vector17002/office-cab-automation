interface CabDetails {
    vehicleNumber?: string;
    driverName?: string;
    driverPhone?: string;
    rosterTime: string;
    pickTime: string;
    dateStr?: string;
    alarmTime?: string;
}

function subtractTime(originalTime: string, subtraction: string): string {
    const [origH, origM] = originalTime.split(":").map(Number);
    const [subH, subM] = subtraction.split(":").map(Number);

    let totalMinutes = (origH * 60 + origM) - (subH * 60 + subM);

    // Handle day wrap (if negative, add 24 hours)
    if (totalMinutes < 0) {
        totalMinutes += 24 * 60;
    }

    const newH = Math.floor(totalMinutes / 60);
    const newM = totalMinutes % 60;

    return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
}

function parseCabSMS(sms: string, expectedAlarm?: string): CabDetails | null {
    if (!/roster/i.test(sms) || !/Expected Pick Time/i.test(sms)) {
        return null;
    }

    const rosterPattern = /roster\s+([0-9]{1,2}:[0-9]{2}),\s*([0-9]{2}-[A-Za-z]{3})/i;
    const pickTimePattern = /Expected Pick Time:([0-9]{1,2}:[0-9]{2})/i;

    const rosterMatch = sms.match(rosterPattern);
    if (!rosterMatch) {
        return null;
    }
    const rosterTime = rosterMatch[1];
    const dateStr = rosterMatch[2];

    const pickTimeMatch = sms.match(pickTimePattern);
    const pickTime = pickTimeMatch ? pickTimeMatch[1] : "";
    let alarmTime = pickTime ? pickTime : "";
    if (pickTime && expectedAlarm) {
        alarmTime = subtractTime(pickTime, expectedAlarm);
    }

    const vehicleMatch = sms.match(/Vehicle\s+([A-Z0-9]+)/i);
    const driverMatch = sms.match(/Driver\s+([A-Z\s]+?)\s*\((\d+)\)/i);

    const vehicleNumber = vehicleMatch ? vehicleMatch[1] : undefined;
    const driverName = driverMatch ? driverMatch[1].trim() : undefined;
    const driverPhone = driverMatch ? driverMatch[2] : undefined;



    return {
        vehicleNumber,
        driverName,
        driverPhone,
        rosterTime,
        pickTime,
        alarmTime,
        dateStr
    };
}

export { parseCabSMS, CabDetails };