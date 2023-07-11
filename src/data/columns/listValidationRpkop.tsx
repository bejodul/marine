import {  Button } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { formatDate } from 'src/types/forms/rpkopTypes'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'

export const Validationcolumns: GridColDef[] = [
  { field: 'ves_id', headerName: 'Ves ID', width: 150 },
  { field: 'vessel_name', headerName: 'Vessel Name', width: 300 },
  { field: 'voyage', headerName: 'Voyage', width: 120 },
  { field: 'berth', headerName: 'Berth', width: 200 },
  {
    field: 'start_work',
    headerName: 'Start Work',
    width: 160,
    valueGetter: (params: GridRenderCellParams) => formatDate(params.row.start_work)
  },
  {
    field: 'end_work',
    headerName: 'End Work',
    width: 160,
    valueGetter: (params: GridRenderCellParams) => formatDate(params.row.end_work)
  },
  { field: 'op_ke', headerName: 'OP Ke', width: 70, align: 'center' },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    headerAlign: 'center',
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Button
          size='small'
          variant='contained'
          color='warning'
          startIcon={<AssignmentTurnedInIcon />}
          onClick={() => handleValidBtnClick(params.row.id as string)}
        >
          Validasi
        </Button>
      )
    }
  }

  // {
  //   field: 'actions',
  //   headerName: 'Actions',
  //   headerAlign: 'center',
  //   width: 200,
  //   renderCell: (params: GridRenderCellParams) => (
  //     <TableCell>
  //       <Button
  //         variant='contained'
  //         color='warning'
  //         onClick={() => handleValidBtnClick(params.row.id as string)}
  //         startIcon={<AssignmentTurnedInIcon />} //startIcon={<VerifiedUserIcon />}
  //         style={{ marginRight: '10px' }} // startIcon={<Icon icon={userRoleObj['admin'].icon} fontSize={20}></Icon>}
  //       >
  //         Validasi
  //       </Button>
  //     </TableCell>
  //   )
  // }
]

const handleValidBtnClick = (id: string) => {
  console.log(`Tombol Edit dengan ID ${id} ditekan.`)
}
