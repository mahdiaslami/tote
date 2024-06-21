
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
}