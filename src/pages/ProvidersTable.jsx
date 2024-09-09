import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { getAllSuppliers } from "../api/providers";
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEdit } from 'react-icons/fa'

function ProvidersTable() {
  const navigate = useNavigate()
  const [page, setPage] = useState(0); // Encargado de manejar la paginación de la tabla
  const [rowsPerPage, setRowsPerPage] = useState(10); // Calcula las filas por página
  const [rowSuppliers, setRowSuppliers] = useState([]); // Guarda las filas que se van agregando a la tabla

  //Columnas predefinidas para la tabla
  const columnSuppliers = [
    { id: 'add', label: 'Agregar', minWidth: 20 },
    { id: "name", label: "Nombre", minWidth: 70 },
    { id: "rif", label: "RIF", minWidth: 70 },
    { id: "location", label: "Ubicación", minWidth: 70 },
  ];

  const createDataSupplier = (location, rif, name, add) => {
    //define los datos que mostrarán en pantalla
    return { location, rif, name, add };
  };

  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditSupplier = () => {
    console.log()
  }

  const handleDeleteProduct = () => {
    console.log()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllSuppliers();

        const processedDataSuppliers = res.data.map((supp, index) => {
          // Procesar cada dato para extraer la información deseada
          const icons = (
            <>
              {/* Ícono de editar */}
              <FaEdit
                key={`editIcon ${index}`}
                className="mx-2"
                size={20}
                type="button"
                onClick={() => handleEditSupplier(index)} // Maneja la acción de edición
              />
        
              {/* Ícono de eliminar */}
              <FaTrashAlt
                key={`prodTrash ${index}`}
                className="mx-2"
                size={20}
                type="button"
                onClick={() => handleDeleteProduct(index)} // Maneja la acción de eliminación
              />
            </>
          );
          const name = supp.name;
          const rif = supp.rif;
          const location = supp.location;
          return createDataSupplier(location, rif, name, icons);
        });

        setRowSuppliers(processedDataSuppliers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="my-auto mx-auto" style={{ width: '70%' }}>
        <h1
          className="text-center fw-bold mt-5 pt-4"
          style={{ color: '#791021' }}
        >
          Proveedores
        </h1>
        <Paper
          sx={{
            width: "95%",
            overflow: "hidden",
            borderRadius: "5px",
            margin: "auto",
          }}
        >
          <TableContainer sx={{ minHeight: 450, borderRadius: "5px" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columnSuppliers.map((column) => (
                    <TableCell
                      key={`label${column?.id}`}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: "#791021",
                        color: "#fff",
                      }}
                    >
                       {column.label == 'Agregar' && (
                        <FaPlus className="text-white mx-2" type='button' size={20} onClick={() => navigate(`/add-provider`)} />
                      )}
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowSuppliers
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={`row${index}`}
                      >
                        {columnSuppliers.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={`data${column?.id}`}
                              align={column.align}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={rowSuppliers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}

export default ProvidersTable;
