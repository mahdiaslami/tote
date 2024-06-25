
export class PersianDate extends Date {
    getPersianFullYear() {
        const options = { year: 'numeric' }
        const year = this.toLocaleDateString('fa-IR', options)

        return year
    }

    getPersianDate() {
        const options = { day: 'numeric' }
        const day = this.toLocaleDateString('fa-IR', options)

        return day
    }

    getPersianMonthName() {
        const options = { month: 'long' }
        const month = this.toLocaleDateString('fa-IR', options)

        return month
    }

    getPersianWeekday() {
        const options = { weekday: 'long' }
        const weekday = this.toLocaleDateString('fa-IR', options)

        return weekday
    }

    isHoliday() {
        return this.getDay() === 5
    }

    isToday() {
        return this.toDateString() == (new Date()).toDateString()
    }

    distanceToToday() {
        const cur = this.duplicate().setHours(0, 0, 0, 0)
        const today = (new Date()).setHours(0, 0, 0, 0)

        return (today - cur) / 86400000
    }

    move(value) {
        this.setDate(this.getDate() + value)
    }

    duplicate() {
        return new PersianDate(this.getTime())
    }
}