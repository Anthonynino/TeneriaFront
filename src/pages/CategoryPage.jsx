import Navbar from '../Navbar'
import { useEffect, useState } from 'react'
import { getAllCategories } from '../api/categories'
import { Link } from 'react-router-dom'
import { IoBulbSharp } from 'react-icons/io5'
import { FaHelmetSafety } from 'react-icons/fa6'
import { AiFillTool } from 'react-icons/ai'
import { GiSolderingIron } from 'react-icons/gi'
import { GiLargePaintBrush } from 'react-icons/gi'
import { GiNails } from 'react-icons/gi'

function CategoryPage() {
  const [categories, setCategories] = useState([])
  const [categoriesMapped, setCategoriesMapped] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllCategories()
      setCategories(response.data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (categories.length > 0) {
      const cards = [
        {
          color: '#FFD700',
          icon: <IoBulbSharp size={70} />,
        },
        {
          color: '#E65A24',
          icon: <AiFillTool size={70} />,
        },
        {
          color: '#2F4F4F',
          icon: <FaHelmetSafety size={70} />,
        },
        {
          color: '#999999',
          icon: <GiSolderingIron size={70} />,
        },
        {
          color: '#801817',
          icon: <GiLargePaintBrush size={70} />,
        },
        {
          color: '#4E3D2E',
          icon: <GiNails size={70} />,
        },
      ]

      // Asegúrate de no mapear más categorías de las que hay en `cards`.
      const categoriesMapped = categories.map((category, index) => {
        const card = cards[index % cards.length] // Evita salirte del índice de `cards`
        return {
          id: category.id,
          title: category.name,
          color: card.color,
          icon: card.icon,
        }
      })

      setCategoriesMapped(categoriesMapped)
    }
  }, [categories])
  return (
    <>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <Navbar />
        <div
          className="w-75 row my-auto mx-auto"
          style={{ paddingTop: '3rem' }}
        >
          <h1 className="text-center fw-bold mb-4 mt-4" style={{ color: '#791021' }}>
            ¿Qué categoría deseas explorar?
          </h1>
          {categoriesMapped.map((card) => {
            return (
              <div
                key={card.id}
                className="col-lg-4 col-md-4 col-sm-6 col-xs-12 d-flex justify-content-center mb-4"
              >
                <Link
                  to={`/homepage/productstable/${card.id}/${card.title}`}
                  style={{
                    background: card.color,
                    height: '200px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  className="no-underline text-white p-4 rounded-4 shadow card-scale d-flex flex-column justify-content-center align-items-center"
                  type="button"
                >
                  <div
                    className="text-center mb-3"
                    style={{ filter: 'opacity(0.8)', fontSize: '3rem' }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-center">{card.title}</h3>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default CategoryPage
