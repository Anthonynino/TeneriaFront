import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProductsRequest, deleteProduct } from '../api/products'
import UpdateStock from './UpdateStock'
import Navbar from '../Navbar'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { ImExit, ImEnter } from 'react-icons/im'
import { FaPlus } from 'react-icons/fa'
import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import { TablePagination } from '@mui/material'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import OperationModal from './SuccessfulOperation'
import Tooltip from '@mui/material/Tooltip'
import { Modal } from 'react-bootstrap'

function ProductsTable() {
  const navigate = useNavigate() // Hook para navegar entre páginas
  const { categoryId, nameCategory } = useParams() // Parametros traidos desde el URL
  const [page, setPage] = useState(0) // Encargado de manejar la paginación de la tabla
  const [rowsPerPage, setRowsPerPage] = useState(5) // Calcula las filas por página
  const [rowProducts, setRowProducts] = useState([]) // Guarda las filas que se van agregando a la tabla
  const [modalUpdateStock, setModalUpdateStock] = useState(false)
  const [arrayProduct, setArrayProduct] = useState([]) // Guardar la data de los productos
  const [isExit, setIsExit] = useState(false) // Estado que controla si es una salida y si no con esto evaluamos que sera una entrada
  const [rolId, setRolId] = useState('') // Se guarda el id del rol desde el localStorage
  const [showModal, setShowModal] = useState(false) //Variable para abrir el modal
  const [modalMessage, setModalMessage] = useState('') // Mensaje que se le enviara al modal
  const [modalTitle, setModalTitle] = useState('') // titulo del modal
  const [isSuccess, setIsSuccess] = useState(true) // Si fue un error o fue exitoso
  const [modalDeleteProduct, setModalDeleteProduct] = useState(false)
  const [productId, setProductId] = useState('')
  const [productName, setProductName] = useState('')

  //Columnas predefinidas para la tabla
  const columnProducts = [
    { id: 'add', label: rolId == '1' && 'Agregar', minWidth: 20 },
    { id: 'name', label: 'Nombre', minWidth: 70 },
    { id: 'quantity', label: 'Cantidad', minWidth: 70 },
    { id: 'code', label: 'Código', minWidth: 70 },
    { id: 'ubication', label: 'Ubicación', minWidth: 70 },
    ...(categoryId == '3' || categoryId == '6'
      ? [{ id: 'size', label: 'Tamaño', minWidth: 70 }]
      : []),
    { id: 'proveedor', label: 'Proveedor', minWidth: 70 },
  ]
  // Actualización de la función createDataProducts
  const createDataProducts = (
    proveedor,
    size,
    ubication,
    code,
    quantity,
    name,
    add
  ) => {
    // define los datos que mostrarán en pantalla
    return { proveedor, size, ubication, code, quantity, name, add }
  }

  const handleChangePage = (event, newPage) => {
    event.preventDefault()
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  //Funcion para cerrar el modal que indica si fue un error en la operacion o un exito
  const handleCloseModal = () => setShowModal(false)

  const handleOpenDeleteProduct = (prodId, prodName) => {
    setModalDeleteProduct(true)
    setProductId(prodId)
    setProductName(prodName)
  }

  // Función para eliminar el producto
  const handleDeleteProduct = async () => {
    try {
      const response = await deleteProduct(productId, categoryId)

      // Verifica que la respuesta sea exitosa
      if (response.status === 200) {
        setShowModal(true)
        setModalTitle('Éxito')
        setModalMessage('¡El producto fue eliminado exitosamente!')
        setIsSuccess(true)
        // Refrescar la tabla de los productos despues de eliminar alguno
        fetchData()
        setModalDeleteProduct(false)
      } else {
        console.error('Error al eliminar el producto:', response.data.message)
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error)
    }
  }

  useEffect(() => {
    //Se extrae los datos guardados del localStorage y se extrae su rolId
    const storedUser = localStorage.getItem('user')
    const userParsed = JSON.parse(storedUser)
    setRolId(userParsed.rolId)
  }, [])

  useEffect(() => {
    if (rolId) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolId])

  // Función para obtener los datos de los productos y departamentos
  const fetchData = async () => {
    try {
      // Llamar al servicio para obtener productos por categoryId
      const res = await getProductsRequest(categoryId)
      setArrayProduct(res.data)
      // Procesar los productos
      const processedDataProducts = res.data.map((prod, index) => {
        const icons =
          parseInt(prod.quantity) === 0 ? (
            <>
              <FaEdit
                key={`editIcon ${index}`}
                className="mx-2"
                size={20}
                type="button"
                onClick={() =>
                  navigate(`/editproduct/${prod.id}/${categoryId}`)
                }
              />
              <FaTrashAlt
                key={`prodTrash ${index}`}
                className="mx-2"
                size={20}
                type="button"
                onClick={() => handleOpenDeleteProduct(prod.id, prod.name)}
              />
            </>
          ) : (
            <>
              <FaEdit
                key={`editIcon ${index}`}
                className="mx-2"
                size={20}
                type="button"
                onClick={() =>
                  navigate(`/editproduct/${prod.id}/${categoryId}`)
                }
              />
              <Tooltip title="Este producto puede ser eliminado cuando el stock esté en 0">
                <span>
                  <FaTrashAlt
                    key={`prodTrash ${index}`}
                    className="mx-2 text-secondary opacity-50 no-select"
                    size={20}
                  />
                </span>
              </Tooltip>
            </>
          )
        return createDataProducts(
          prod.supplier.name,
          categoryId === '3' || categoryId === '6' ? prod.size : '',
          prod.ubication,
          prod.code,
          prod.quantity,
          prod.name,
          rolId === '1' ? icons : ''
        )
      })

      setRowProducts(processedDataProducts)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <Navbar />
        <div className="my-auto mx-auto" style={{ width: '70%' }}>
          <h1
            className="text-center fw-bold mt-5 pt-4 mb-3"
            style={{ color: '#791021' }}
          >
            {nameCategory}
          </h1>
          {rolId == '1' && (
            <div className="d-flex justify-content-center mb-4">
              <button
                className="btn button-submit text-white mx-2"
                type="button"
                style={{ width: '20%' }}
                onClick={() => {
                  setModalUpdateStock(true), setIsExit(false)
                }}
              >
                <span className="my-auto">
                  <ImEnter className="mb-1" /> Entrada
                </span>
              </button>
              <button
                className="btn button-submit text-white mx-2"
                type="submit"
                style={{ width: '20%' }}
                onClick={() => {
                  setModalUpdateStock(true), setIsExit(true)
                }}
              >
                <span className="my-auto">
                  <ImExit className="mb-1" /> Salida
                </span>
              </button>
            </div>
          )}
          <Paper
            sx={{
              width: '95%',
              overflow: 'hidden',
              borderRadius: '5px',
              margin: 'auto',
            }}
          >
            <TableContainer sx={{ minHeight: 340, borderRadius: '5px' }}>
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
                        {column.label == 'Agregar' && rolId == '1' && (
                          <FaPlus
                            className="text-white mx-2"
                            type="button"
                            size={20}
                            onClick={() =>
                              navigate(`/add-product/${categoryId}`)
                            }
                          />
                        )}
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowProducts
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
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
              rowsPerPageOptions={[5, 25, 50]}
              component="div"
              count={rowProducts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
        <UpdateStock
          modalUpdateStock={modalUpdateStock}
          handleCloseUpdateStock={() => setModalUpdateStock(false)}
          productsValues={arrayProduct}
          isExit={isExit}
          fetchProductTable={fetchData}
          setShowModal={setShowModal}
          setModalMessage={setModalMessage}
          setModalTitle={setModalTitle}
          setIsSuccess={setIsSuccess}
          categoryId={categoryId}
        />
      </div>
      {/* Mostrar el modal con título personalizado */}
      <OperationModal
        showModal={showModal}
        handleClose={handleCloseModal}
        isSuccess={isSuccess}
        title={modalTitle} // Pasamos el título personalizado
        message={modalMessage}
      />
      <Modal show={modalDeleteProduct} centered>
        <div className="p-5 text-center fonts-letter rounded-1">
          <div className="d-flex flex-column">
            <FaTrashAlt
              className="mx-auto mb-1 text-secondary opacity-25"
              size={120}
            />
            <h3 className="my-2 fw-bold" style={{ color: '#791021' }}>
              {productName}
            </h3>
            <p className="text-secondary" style={{ fontSize: '17px' }}>
              ¿Estas seguro de eliminar este producto?
            </p>
          </div>
          <div className="mt-1 d-flex justify-content-center">
            <button
              style={{ background: '#701021' }}
              className="btn mx-2 px-4"
              type="button"
              onClick={() => setModalDeleteProduct(false)}
            >
              <span className="my-auto text-white">Cancelar</span>
            </button>
            <button
              style={{ background: '#DAA520' }}
              className="btn mx-2 px-4"
              type="button"
              onClick={handleDeleteProduct}
            >
              <span className="my-auto text-white">Eliminar</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ProductsTable
