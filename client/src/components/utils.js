export function formattedDates(start, end) {
    const options = { year: 'numeric', month: 'long', day:'numeric'}
    const datedStart = new Date(start)
    const startDay = datedStart.getDate()
    const startMonth = datedStart.getMonth()
    const startYear = datedStart.getFullYear()
    const datedEnd = new Date(end)
    const endDay = datedEnd.getDate()
    const endMonth = datedEnd.getMonth()
    const endYear = datedEnd.getFullYear()

    const startDate = datedStart.toLocaleDateString('en-gb', options)
    const endDate = datedEnd.toLocaleDateString('en-gb', options)

    if (startMonth === endMonth && startYear === endYear) {
        return `${startDay}-${endDay} ${getMonthName(startMonth)} ${startYear}`
    } else if (startYear === endYear) {
        return `${startDay} ${getMonthName(startMonth)}-${endDay} ${getMonthName(endMonth)} ${startYear}`
    } else {
        return `${startDate} - ${endDate}`
    }
}

function getMonthName(monthIndex) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[monthIndex]
}