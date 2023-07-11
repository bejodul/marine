import { DataGrid, GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid'

import { useEffect, useState } from 'react'
import { Button, Chip, Stack, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import DescriptionIcon from '@mui/icons-material/Description'
import { format } from 'date-fns'
import QuickSearchToolbar from './component/QuickSearchToolbar'
import CustomPaginationBtn from './component/CustomPaginationBtn'

export default function PageSizeCustomOptions() {
  //const [pageSize, setPageSize] = useState<number>(5)
  const [rows, setRows] = useState<DataGridRowType[]>([])
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0
  })

  const fetchData = async () => {
    const res = await fetch(`${process.env.API_URL}/api/pkk/?id=a`)

    const json = await res.json()

    const data = json.data

    setRows(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  type DataGridRowType = {
    ves_code: string
    voyIn: string
    voyOut: string
    eta: string
    etd: string
    kp_grt: string
    kp_loa: string
    jn_kemasan: string
    jn_kapal: string
    jn_playar: string
    jn_kunjungan: string
    jn_kegiatan: string
    kd_proses: string
    pel_asal: string
    pel_sebelum: string
    pel_berikut: string
    pel_akhir: string
    created_by: string
    created_date: string
    vesId: string
    pilot: string
    load: string
    status: string
    agent: string
    bendera: string
    kp_dwt: string
    liner: string
    vesName: string
    nm_agent: string
    st_kapal: string
    rpkop: string
    update_by: string
    update_ts: string
    keterangan_pkk: string
    tax_treaty: string
    penyaluran_op: string
    pkk_no: string
    ppk_no: string
    pkk_man_no: string
    direct_call: string
    bank_cd: string
    bc11: string
    bc11_ts: string
    doc_cutoff_ts: string
    cutoff_ts: string
    available_ts: string
    clossing_cargo_ts: string
    clossing_doc_ts: string
    site_id: string
    group_id: string
  }

  const columns: GridColDef[] = [
    {
      flex: 0.25,
      minWidth: 150,
      field: 'vesId',
      headerName: 'Vessel ID',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {row.vesId}
          </Typography>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 300,
      field: 'vesName',
      headerName: 'Vessel Name',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary' }}>
            {row.vesName}
          </Typography>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 150,
      field: 'voy_in',
      headerName: 'Voyage',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary' }}>
            {row.voyIn} / {row.voyOut}
          </Typography>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 180,
      field: 'eta',
      headerName: 'ETA',
      valueFormatter: (params: GridValueFormatterParams<Date>) => {
        const formattedDate = format(new Date(params.value), 'dd-MM-yyyy hh:mm')

        return formattedDate
      }
    },
    {
      flex: 0.25,
      minWidth: 180,
      field: 'etd',
      headerName: 'ETD',
      valueFormatter: (params: GridValueFormatterParams<Date>) => {
        const formattedDate = format(new Date(params.value), 'dd-MM-yyyy hh:mm')

        return formattedDate
      }
    },
    {
      flex: 0.25,
      minWidth: 150,
      field: 'rpkop',
      headerName: 'Disc/Load',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Typography noWrap variant='body2' sx={{ color: 'text.primary' }}>
            {row.rpkop}
          </Typography>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 150,
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      renderCell: () => {
        return (
          <Button size='small' variant='outlined' startIcon={<EditIcon />}>
            Edit
          </Button>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 350,
      field: 'print',
      headerName: 'Print',
      sortable: false,
      renderCell: () => {
        return (
          <Stack direction='row' spacing={1}>
            <Chip icon={<DescriptionIcon />} label='KPI' size='small' variant='outlined' />
            <Chip icon={<DescriptionIcon />} label='DO Online' size='small' variant='outlined' />
            <Chip icon={<DescriptionIcon />} label='COPARN' size='small' variant='outlined' />
            <Chip icon={<DescriptionIcon />} label='PKK' size='small' variant='outlined' />
          </Stack>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 150,
      field: 'ppkb',
      headerName: 'PPKB',
      sortable: false,
      renderCell: () => {
        return (
          <Button size='small' variant='outlined' startIcon={<AddIcon />}>
            Create
          </Button>
        )
      }
    }
  ]

  const getRowId = row => row.vesId

  return (
    <DataGrid
      autoHeight
      getRowId={getRowId}
      pagination
      rows={rows}
      columns={columns}
      pageSizeOptions={[5, 10, 25]}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 25
          }
        }
      }}
      slots={{ toolbar: QuickSearchToolbar, pagination: CustomPaginationBtn }}
    />
  )
}
