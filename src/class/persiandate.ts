
export class PersianDate extends Date {
    getPersianFullYear(): string {
        const options = { year: 'numeric' } as Intl.DateTimeFormatOptions
        const year = this.toLocaleDateString('fa-IR', options)

        return year
    }

    getPersianDate(): string {
        const options = { day: 'numeric' } as Intl.DateTimeFormatOptions
        const day = this.toLocaleDateString('fa-IR', options)

        return day
    }

    getPersianMonthName(): string {
        const options = { month: 'long' } as Intl.DateTimeFormatOptions
        const month = this.toLocaleDateString('fa-IR', options)

        return month
    }

    getPersianWeekday(): string {
        const options = { weekday: 'long' } as Intl.DateTimeFormatOptions
        const weekday = this.toLocaleDateString('fa-IR', options)

        return weekday
    }

    isHoliday(): boolean {
        return this.getDay() === 5
    }

    isToday(): boolean {
        return this.toDateString() == (new Date()).toDateString()
    }

    // TODO: find better name for this
    distanceToToday(): number {
        const cur = this.duplicate().setHours(0, 0, 0, 0)
        const today = (new Date()).setHours(0, 0, 0, 0)

        return (today - cur) / 86400000
    }

    // TODO: rename it to add
    move(value: number) {
        this.setDate(this.getDate() + value)
    }

    duplicate() {
        return new PersianDate(this.getTime())
    }
}