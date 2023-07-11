import { Card, CardHeader } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { ChangeEvent, useState } from 'react'
import CustomNoRowsOverlay from 'src/layouts/components/rpkop/CustomNoRowsOverlay'
import CustomPaginationBtn from 'src/layouts/components/rpkop/CustomPaginationBtn'
import QuickSearchToolbar from './QuickSearchToolbar'

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}


// const LoadingSkeleton = () => (
//   <Box sx={{ height: 'max-content' }}>
//     {[...Array(10)].map((_, index) => (
//       <Skeleton key={index} variant='rectangular' animation="wave" sx={{ my: 4, mx: 1 }} />
//     ))}
//   </Box>
// );

const TableFilterColumn = (props: {
  title: string
  rows: any[]
  columns: GridColDef[]
  isExport?: boolean
  alignContent?: string
  isLoading?: boolean
}) => {
  const { title, rows, columns, isExport = true, alignContent = 'space-between', isLoading = false } = props
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState([])

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows: any = props.rows.filter((row: any) => {
      return Object.keys(row).some(field => {
        // @ts-ignore
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
        loading={isLoading}
        autoHeight
        rows={filteredData.length ? filteredData : rows}
        columns={columns}
        pageSizeOptions={[5, 10, 25, 50]}
        slots={{
          // loadingOverlay: LoadingSkeleton,
          toolbar: QuickSearchToolbar,
          pagination: CustomPaginationBtn,
          noRowsOverlay: CustomNoRowsOverlay
        }}
        slotProps={{
          baseButton: {
            variant: 'outlined'
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value),
            isExport: isExport,
            alignContent: alignContent
          }
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } }
        }}
      />
    </Card>
  )
}

export default TableFilterColumn
