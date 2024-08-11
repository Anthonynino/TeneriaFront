import { MdCategory } from 'react-icons/md'
import { HiDocumentReport } from 'react-icons/hi'
import { ImExit } from 'react-icons/im'
import { FaArrowRightLong } from 'react-icons/fa6'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { FaTruckArrowRight } from "react-icons/fa6";
import { IoBulbSharp } from 'react-icons/io5'
import { FaHelmetSafety } from 'react-icons/fa6'
import { AiFillTool } from 'react-icons/ai'
import { GiSolderingIron } from 'react-icons/gi'
import { GiLargePaintBrush } from 'react-icons/gi'
import { GiNails } from 'react-icons/gi'
import { LuLayoutDashboard } from "react-icons/lu";

export const cards = [
  {
    id: 1,
    title: 'Electricidad',
    color: '#FFD700',
    icon: <IoBulbSharp size={70} />,
  },
  {
    id: 2,
    title: 'Plomería',
    color: '#E65A24',
    icon: <AiFillTool size={70} />,
  },
  {
    id: 3,
    title: 'S.Laboral',
    color: '#2F4F4F',
    icon: <FaHelmetSafety size={70} />,
  },
  {
    id: 4,
    title: 'Metalurgia',
    color: ' #999999',
    icon: <GiSolderingIron size={70} />,
  },
  {
    id: 5,
    title: 'Pintura',
    color: '#801817',
    icon: <GiLargePaintBrush size={70} />,
  },
  {
    id: 6,
    title: 'Tornillería',
    color: '#4E3D2E',
    icon: <GiNails size={70} />,
  },
]

export const menuOption = [
  {
    id: 0,
    link: '/homepage',
    icon: (
      <LuLayoutDashboard
        className="mx-2"
        style={{ top: '10px' }}
        size={30}
      />
    ),
    title: 'Inicio',
  },
  {
    id: 1,
    link: '/category',
    icon: (
      <MdCategory
        className="mx-2"
        style={{ top: '10px' }}
        size={30}
      />
    ),
    title: 'Ver Categorías',
  },
  {
    id: 2,
    link: '/homepage',
    icon: (
      <HiDocumentReport
        className="mx-2"
        style={{ top: '10px' }}
        size={30}
      />
    ),
    title: 'Ver Reportes',
  },
  {
    id: 3,
    link: '/add-product',
    icon: (
      <FaArrowRightLong
        className="mx-2"
        style={{ top: '10px' }}
        size={30}
      />
    ),
    title: 'Realizar Ingreso',
  },
  {
    id: 4,
    link: '/homepage',
    icon: (
      <FaArrowLeftLong
        className="mx-2"
        style={{ top: '10px' }}
        size={30}
      />
    ),
    title: 'Realizar Salida',
  },
  {
    id: 5,
    link: '/add-provider',
    icon: (
      <FaTruckArrowRight
        className="mx-2"
        style={{ top: '10px' }}
        size={30}
      />
    ),
    title: 'Agregar proveedor',
  },
  {
    id: 6,
    link: '/login',
    icon: (
      <ImExit
        className="mx-2"
        style={{ top: '10px' }}
        size={30}
      />
    ),
    title: 'Salir',
  },
]
