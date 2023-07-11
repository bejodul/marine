export type RpkopListDataType = {
  id: string
  ves_id: string
  vessel_name: string
  voyage: string
  berth: string
  start_work: Date
  end_work: Date
  op_ke: number
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    hour12: false
  })

  return formattedDate
}
