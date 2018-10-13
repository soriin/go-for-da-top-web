import * as moment from 'moment'

export function formatDate(date: Date|string): string {
  return moment(date).format('ddd, MMM D YYYY')
}

export function truncate(s: string, max: number): string {
  let newString =  s.substr(0, max)
  if (s.length > max) newString += '...'
  return newString
}