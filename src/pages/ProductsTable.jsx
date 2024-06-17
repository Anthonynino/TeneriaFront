import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { TablePagination } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { FaPlus} from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'
import Navbar from '../Navbar'
import { getProductsRequest } from '../api/products'

function ProductsTable() {
  const { categoryId, nameCategory } = useParams()
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0) //Encargado de manejar la paginación de la tabla
  const [rowsPerPage, setRowsPerPage] = useState(10) //Calcula las filas por pagina
  const [rowProducts, setRowProducts] = useState([]) //Guarda las filas que se van agregando a la tabla

  const getProducts = async () =>{
    const res = await getProductsRequest(categoryId)
    setProducts(res.data)
    console.log(res);
  }

  useEffect(() => {
    try {
      getProducts()
    } catch (error) {
      console.error('Error fetching data:', error)
    }

  
  }, [categoryId])

  const columnProducts = [
    { id: 'add', label: 'Agregar', minWidth: 20 },
    { id: 'name', label: 'Nombre', minWidth: 70 },
    { id: 'quantity', label: 'Cantidad', minWidth: 70 },
    { id: 'code', label: 'Código', minWidth: 70 },
    { id: 'ubication', label: 'Ubicación', minWidth: 70 },
    { id: 'size', label: 'Tamaño', minWidth: 70 },
  ]

  function createDataProducts(size, ubication,code,quantity,name, add) {
    //define los datos que mostrarán en pantalla
    return {size, ubication,code,quantity, name, add }
  }

  useEffect(() => {
    if (products) {
      const processedDataProducts = products.map((prod, index) => {
        // Procesar cada dato para extraer la información deseada
        const icons = [
          <FaTrashAlt
            key={`prodTrash${index}`}
            className="mx-2"
            size={20}
            type="button"
          />,
        ]
        const name = prod.name
        const quantity = prod.quantity
        const code = prod.code
        const ubication = prod.ubication
        const size = prod.size
        return createDataProducts(size,ubication, code, quantity ,name, icons)
      })
      setRowProducts(processedDataProducts)
    }
  }, [products])

  const handleChangePage = (event, newPage) => {
    event.preventDefault()
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <div className="d-flex">
      <Navbar />
      <div className="row my-auto mx-auto" style={{ width:"74%" }}>
        <h1 className="text-center fw-bold mb-4" style={{ color: '#791021' }}>
          {nameCategory}
        </h1>
        <Paper
          sx={{
            width: '95%',
            overflow: 'hidden',
            borderRadius: '5px',
            margin: 'auto',
          }}
        >
          <TableContainer sx={{ minHeight: 450, borderRadius: '5px'}}>
            <Table
              stickyHeader
              aria-label="sticky table"

            >
              <TableHead>
                <TableRow>
                  {columnProducts.map((column) => (
                    <TableCell
                      key={`label${column?.id}`}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: '#791021',
                        color: '#fff',
                      }}
                    >                                  {column.label == "Agregar" && (
                        <FaPlus
                          className="text-white mx-1"
                          size={20}
                        />
                      )}
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowProducts
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={`row${index}`}
                      >
                        {columnProducts.map((column) => {
                          const value = row[column.id]
                          return (
                            <TableCell
                              key={`data${column?.id}`}
                              align={column.align}
                            >
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={rowProducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  )
}

export default ProductsTable
