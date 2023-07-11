import React, { ChangeEvent, useState } from 'react'
import { Card, CardHeader } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

interface Dataset {
  title: string
  DataGridRowType: {}
  columns: any[]
  rows: any[]
}

const DataGridCustom = ({ props }: { props: Dataset }) => {
  const { title, columns, rows } = props
  const [data] = useState<any[]>(rows)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  return (
    <Card>
      <CardHeader title={title} />
      <DataGrid
        autoHeight
        rows={filteredData.length ? filteredData : data}
        columns={columns}
        pageSizeOptions={[5, 10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } }
        }}
        slots={{ toolbar: QuickSearchToolbar }}
        paginationModel={paginationModel}
        pagination
        onPaginationModelChange={setPaginationModel}
        slotProps={{
          baseButton: {
            variant: 'outlined'
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
          }
        }}
      />
    </Card>
  )
}

export default DataGridCustom
