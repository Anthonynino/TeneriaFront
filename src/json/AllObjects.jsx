import { MdCategory } from 'react-icons/md'
import { HiDocumentReport } from 'react-icons/hi'
import { ImExit } from 'react-icons/im'
import { FaTruckArrowRight } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";

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
    link: '/reports',
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
    link: '/providerstable',
    icon: (
      <FaTruckArrowRight
        className="mx-2"
        style={{ top: '10px' }}
        size={30}
      />
    ),
    title: 'Ver Proveedores',
  },
  {
    id: 4,
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
