import { Card, CardHeader } from '@mui/material'
import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import CustomNoRowsOverlay from 'src/layouts/components/rpkop/CustomNoRowsOverlay'

import CustomPaginationBtn from 'src/layouts/components/rpkop/CustomPaginationBtn'

import QuickSearchToolbar from './QuickSearchToolbar'
import axios from 'axios'

// import axios from 'axios'

// const escapeRegExp = (value: string) => {
//   return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
// }

type SortType = 'asc' | 'desc' | undefined | null

const TableServerSide = (props: {
  title: string
  columns?: GridColDef[]
  isExport?: boolean
  alignContent?: string
  url: string
}) => {
  const { title, isExport = true, alignContent = 'space-between', url, columns } = props
  const [total, setTotal] = useState<number>(0)
  const [sort, setSort] = useState<SortType>('asc')
  const [rows, setRows] = useState<any[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<string>('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
  const [isLoading, setIsLoading] = useState(true)

  const fetchTableData = useCallback(
    async (sort: SortType, searchValue: string, column: string) => {
      const params = {
        sort: sort,
        sortColumn: column,
        searchValue: searchValue,
        page: paginationModel.page,
        pageSize: paginationModel.pageSize
      }
      setIsLoading(true);
      await axios
        .get(url, { params: params })
        .then(res => {
          setTotal(res.data.data.total)
          setRows(res.data.data.data)
          console.log('row : ', res.data.data.data)
          setIsLoading(false)
        })
        .catch(() => setIsLoading(false))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationModel]
  )
  useEffect(() => {
    fetchTableData(sort, searchValue, sortColumn)
  }, [fetchTableData, searchValue, sort, sortColumn])

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortColumn(newModel[0].field)
      fetchTableData(newModel[0].sort, searchValue, newModel[0].field)
    } else {
      setSort('asc')
      setSortColumn('')
    }
  }

  const handleColumnMenuChange = params => {
    console.log('handle : ', params)
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
    fetchTableData(sort, value, sortColumn)
  }

  return (
    <Card>
      <CardHeader title={title} />
      <DataGrid
        loading={isLoading}
        pagination
        autoHeight
        rows={rows}
        columns={columns}
        rowCount={total}
        sortingMode='server'
        paginationMode='server'
        onMenuOpen={handleColumnMenuChange}
        pageSizeOptions={[5, 10, 25, 50]}
        onSortModelChange={handleSortModel}
        onPaginationModelChange={setPaginationModel}
        slots={{
          toolbar: QuickSearchToolbar,

          // pagination: CustomPaginationBtn,
          noRowsOverlay: CustomNoRowsOverlay
        }}
        slotProps={{
          baseButton: {
            variant: 'outlined'
          },
          toolbar: {
            value: searchValue,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value),
            isExport: isExport,
            alignContent: alignContent
          }
        }}
        initialState={{
          pagination: { paginationModel }
        }}
      />
    </Card>
  )
}

export default TableServerSide
