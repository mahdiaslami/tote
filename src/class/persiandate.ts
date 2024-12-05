
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

  distanceInDay(date: Date): number {
    const cur = this.duplicate().setHours(0, 0, 0, 0)
    const today = date.setHours(0, 0, 0, 0)

    return (today - cur) / 86400000
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

    return new PersianDate(p2j(year, month, day))
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

//
// THESE CODES COPIED FROM
// https://github.com/alibaba-aero/jalaliday/blob/master/src/calendar.js
//

// PERSIAN_EPOCH
const PE = 1948320.5

function p2j(year: number, month: number, day: number) {
  const epbase = year - ((year >= 0) ? 474 : 473)
  const epyear = 474 + mod(epbase, 2820)

  return day +
    ((month <= 7) ?
      ((month - 1) * 31) :
      (((month - 1) * 30) + 6)
    ) +
    $floor(((epyear * 682) - 110) / 2816) +
    (epyear - 1) * 365 +
    $floor(epbase / 2820) * 1029983 +
    (PE - 1)
}

/*  MOD  --  Modulus function which works for non-integers.  */
const $floor = Math.floor
function mod(a: number, b: number) {
  return a - (b * $floor(a / b))
}