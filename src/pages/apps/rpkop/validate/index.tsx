// import React, { useEffect, useState } from 'react'
// import Grid from '@mui/material/Grid'
// import Typography from '@mui/material/Typography'
// import PageHeader from 'src/@core/components/page-header'
// import { RpkopListDataType } from 'src/types/forms/rpkopTypes'
// import { Validationcolumns } from 'src/data/columns/listValidationRpkop'
// import TableFilterColumn from 'src/views/table/data-grid/TableFilter'
// import axios from 'axios'


// const ValidateRPKOP = () => {
//   const [dataRow, setDataRow] = useState<RpkopListDataType[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${process.env.API_URL}/api/rpkop/validate`)
//         setDataRow(res.data.data)
//         setIsLoading(false)
//       } catch (error) {
//         console.error('Error fetching data : ', error)
//         setIsLoading(false)
//       }
//     }

//     const fetchDataAsync = async () => {
//       await fetchData()
//     }

//     fetchDataAsync()
//   }, [])

//   return (
//     <Grid container spacing={6}>
//       <PageHeader title={<Typography variant='h5'>Validation RPKOP (Operation Planning)</Typography>} />
//       <Grid item xs={12}>

//         <TableFilterColumn title='List Data' rows={dataRow} columns={Validationcolumns} isLoading={isLoading}/>

//       </Grid>
//     </Grid>
//   )
// }

// export default ValidateRPKOP


import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import PageHeader from 'src/@core/components/page-header'
import TableServerSide from 'src/views/table/data-grid/TableServerSide'
import { GridColDef } from '@mui/x-data-grid'

const dataColumns: GridColDef[] = [
  { field: 'id', headerName: 'id', width: 150 },
  { field: 'name', headerName: 'name', width: 300 },
  { field: 'description', headerName: 'description', width: 200 }
]

const ValidateRPKOP = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader title={<Typography variant='h5'>Validation RPKOP (Operation Planning)</Typography>} />
      <Grid item xs={12}>
      <TableServerSide title='List Data Server Side' url="/api/datatemp" columns={dataColumns}/>
      </Grid>
    </Grid>
  )
}

export default ValidateRPKOP

