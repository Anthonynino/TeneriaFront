import Navbar from '../Navbar'
import { useEffect, useState } from 'react'
import { FaTruck } from 'react-icons/fa'
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';


function ReportPage() {
    
    const [user, setUser] = useState() // Estado para guardar el valor del localstorage del usuario

    const cardReport = [
        {
            id: 1,
            title: 'Proveedores',
            icon: <FaTruck size={48} />,
            color: ' #999999',
            link: "report-suppliers",
        },
        {
            id: 2,
            title: 'Movimientos',
            icon: <FaArrowRightArrowLeft size={48} />,
            color: '#801817',
            link: "movimientos",
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
                                        <Link to={`/${card.link}`} className="text-white">
                                            Ver más
                                        </Link>
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

export default ReportPage