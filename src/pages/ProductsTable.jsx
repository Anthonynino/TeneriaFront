import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { TablePagination } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import { getProductsRequest } from '../api/products'

function ProductsTable() {
  const navigate = useNavigate(); // Hook para navegar entre páginas
  const { categoryId, nameCategory } = useParams(); // Parametros traidos desde el URL
  const [page, setPage] = useState(0); // Encargado de manejar la paginación de la tabla
  const [rowsPerPage, setRowsPerPage] = useState(10); // Calcula las filas por página
  const [rowProducts, setRowProducts] = useState([]); // Guarda las filas que se van agregando a la tabla

  //Columnas predefinidas para la tabla
  const columnProducts = [
    { id: 'add', label: 'Agregar', minWidth: 20 },
    { id: 'name', label: 'Nombre', minWidth: 70 },
    { id: 'quantity', label: 'Cantidad', minWidth: 70 },
    { id: 'code', label: 'Código', minWidth: 70 },
    { id: 'ubication', label: 'Ubicación', minWidth: 70 },
    { id: 'size', label: 'Tamaño', minWidth: 70 },
  ]

  const createDataProducts = (size, ubication, code, quantity, name, add) => {
    //define los datos que mostrarán en pantalla
    return { size, ubication, code, quantity, name, add }
  }

  const handleChangePage = (event, newPage) => {
    event.preventDefault()
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  
  const handleDeleteProduct = (index) => {
    setRowProducts((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductsRequest(categoryId);
        const processedDataProducts = res.data.map((prod, index) => {
          // Procesar cada dato para extraer la información deseada
          const icons = parseInt(prod.quantity) === 0
            ? <FaTrashAlt
                key={`prodTrash${index}`}
                className="mx-2"
                size={20}
                type="button"
                onClick={() => handleDeleteProduct(index)}
              />
            : null;
          const name = prod.name;
          const quantity = prod.quantity;
          const code = prod.code;
          const ubication = prod.ubication;
          const size = prod.size;
          return createDataProducts(
            size,
            ubication,
            code,
            quantity,
            name,
            icons
          );
        });

        setRowProducts(processedDataProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <div className="d-flex" style={{minHeight:"100vh"}}>
      <Navbar />
      <div className="row my-auto mx-auto" style={{ width: '70%' }}>
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
          <TableContainer sx={{ minHeight: 450, borderRadius: '5px' }}>
            <Table stickyHeader aria-label="sticky table">
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
                    >
                      {' '}
                      {column.label == 'Agregar' && (
                        <FaPlus className="text-white mx-2" type='button' size={20} onClick={() => navigate(`/add-product/${categoryId}`)} />
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
