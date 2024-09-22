import Navbar from '../Navbar'
import { useEffect, useState } from 'react'
import { SiMicrosoftexcel } from "react-icons/si";
import { FaRegFilePdf } from "react-icons/fa";
import axios from '../api/axios';


function ReportProducts() {
    
    const [user, setUser] = useState() // Estado para guardar el valor del localstorage del usuario


    
    const downloadExcel = async () => {
        try {
            //formateo de fecha
            const currentDate = new Date();
            const formattedDate = `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
            ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
            //Petición a la API
            const response = await axios.get('/reportProductExcel', {
                responseType: 'blob',
            });
            const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = urlBlob;
            link.setAttribute('download', `reporte-movimientos-${formattedDate}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error( error);
        }
    };

    const downloadPDF = async () => {
        try {
            //formateo de fecha
            const currentDate = new Date();
            const formattedDate = `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
            ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
            //Petición a la API
            const response = await axios.get('/reportProductPDF', {
                responseType: 'blob',
            });
            const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = urlBlob;
            link.setAttribute('download', `reporte-movimientos-${formattedDate}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error( error);
        }
    };


    const cardReport = [
        {
            id: 1,
            title: ' Reporte en Excel',
            icon: <SiMicrosoftexcel size={48} />,
            color: '#217346', // Verde similar al de Excel
            action: downloadExcel,
        },
        {
            id: 2,
            title: ' Reporte en PDF',
            icon: <FaRegFilePdf size={48} />,
            color: '#FF0000', // Rojo similar al de PDF
            action: downloadPDF,
        },
    ]

    useEffect(() => {
        

        // Recupera la información del usuario desde localStorage
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setUser(parsedUser)
        }
    }, [])

    return (
        <>
            <br />
            <div className="d-flex" style={{ minHeight: '100vh' }}>
                <Navbar />
                <div className="w-50 row my-auto mx-auto">
                    <h1 className="text-center fw-bold" style={{ color: '#791021' }}>
                        {user?.rolId === "1" ? 'Panel de Administración' : 'Panel de Información'}
                    </h1>
                    {cardReport.map((card) => {
                        return (
                            <div
                                key={card.id}
                                className="col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex flex-column justify-content-center mx-auto"
                            >
                                <div
                                    style={{ background: card.color }}
                                    className="no-underline text-white p-3 my-2 rounded-4 shadow"
                                >
                                    <div
                                        className="text-center"
                                        style={{ filter: 'opacity(0.4)' }}
                                    >
                                        {card.icon}
                                    </div>
                                    <h3 className="text-center">{card.title}</h3>
                                    <p className="text-center">
                                        <button 
                                            onClick={card.action} 
                                            className="btn btn-light"
                                        >
                                            Generar
                                        </button>
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default ReportProducts