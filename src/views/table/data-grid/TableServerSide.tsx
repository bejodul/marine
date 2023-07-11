import { Card, CardHeader } from '@mui/material'
import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid'
import { KeyboardEvent, useCallback, useEffect, useState } from 'react'
import CustomNoRowsOverlay from 'src/layouts/components/rpkop/CustomNoRowsOverlay'

import CustomPaginationBtn from 'src/layouts/components/rpkop/CustomPaginationBtn'

import QuickSearchToolbarSS from './QuickSearchToolbarSS'
import axios from 'axios'

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
    async (sort: SortType, column: string, searchValue: string) => {
      const params = {
        sort: sort,
        sortColumn: column,
        searchValue: searchValue,
        page: paginationModel.page,
        pageSize: paginationModel.pageSize
      }
      setIsLoading(true)
      await axios
        .get(url, { params: params })
        .then(res => {
          setTotal(res.data.data.total)
          setRows(res.data.data.data)
          setIsLoading(false)
        })
        .catch(() => setIsLoading(false))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationModel]
  )
  useEffect(() => {
    fetchTableData(sort, sortColumn, searchValue)
  }, [fetchTableData, sort, sortColumn, searchValue])

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortColumn(newModel[0].field)
      fetchTableData(newModel[0].sort, newModel[0].field, searchValue)
    } else {
      setSort('asc')
      setSortColumn('')
    }
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
    fetchTableData(sort, sortColumn, value)
  }

  const handleClearSearch = (value: string) => {
    setSearchValue(value)
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
        disableColumnMenu
        pageSizeOptions={[5, 10, 25, 50]}
        onSortModelChange={handleSortModel}
        onPaginationModelChange={setPaginationModel}
        slots={{
          toolbar: QuickSearchToolbarSS,
          pagination: CustomPaginationBtn,
          noRowsOverlay: CustomNoRowsOverlay
        }}
        slotProps={{
          baseButton: {
            variant: 'outlined'
          },
          toolbar: {
            clearSearch: () => handleClearSearch(''),
            onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Enter') {
                const inputElement = event.target as HTMLInputElement
                handleSearch(inputElement.value)
              }
            },
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
