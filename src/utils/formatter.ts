import * as moment from 'moment'

export function formatDate(date:Date) :string {
  return moment(date).format('ddd, MMM D YYYY')
}