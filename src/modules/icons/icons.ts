import { library } from '@fortawesome/fontawesome-svg-core'
import { faClipboardList, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export function initializeIcons() {
  library.add(faClipboardList)
  library.add(faTrashAlt)
}