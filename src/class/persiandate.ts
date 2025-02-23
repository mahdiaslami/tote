import c from './calendar.js'

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

  toPersianLocalDateString() {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    } as Intl.DateTimeFormatOptions

    return this.toLocaleDateString('fa-IR', options)
  }

  isHoliday(): boolean {
    return this.getDay() === 5
  }

  isToday(): boolean {
    return this.toDateString() == (new Date()).toDateString()
  }

  distanceInDay(date: Date): number {
    const cur = this.duplicate().setHours(0, 0, 0, 0)
    const today = date.setHours(0, 0, 0, 0)

    return (today - cur) / 86400000
  }

  isInSameDay(date: (Date | number)) {
    const aDate = new Date(date)

    return this.getFullYear() === aDate.getFullYear() &&
      this.getMonth() === aDate.getMonth() &&
      this.getDate() === aDate.getDate()
  }

  isAfter(date: (Date | number)) {
    return date < this
  }

  isBefore(date: (Date | number)) {
    return date > this
  }

  static create() {
    return new PersianDate()
  }

  toDateGroup() {
    const options = {
      numberingSystem: 'latn',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    } as Intl.DateTimeFormatOptions

    return this.toLocaleDateString('fa-IR', options)
  }

  static fromDateGroup(date: string) {
    const [strYear, strMonth, strDay] = date.split('/')

    const year = strYear ? Number.parseInt(strYear) : NaN
    const month = strMonth ? Number.parseInt(strMonth) : 1
    const day = strDay ? Number.parseInt(strDay) : 1

    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
      throw `${date} is not a date group`
    }

    return new PersianDate(c.G(year, month, day))
  }

  static today() {
    const result = new PersianDate()
    result.setHours(0, 0, 0, 0)
    return result
  }

  addDay(): this {
    return this.addDays(1)
  }

  subDay(): this {
    return this.addDays(-1)
  }

  addDays(value: number): this {
    this.setDate(this.getDate() + value)
    return this
  }

  duplicate() {
    return new PersianDate(this.getTime())
  }
}