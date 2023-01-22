import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Pet from '../components/Pet'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import PetCarousel from '../components/PetCarousel'
import { listPets } from '../actions/petActions'


function HomeScreen({history}) {
  const dispatch = useDispatch()
  const petList = useSelector(state => state.petList)
  const { error, loading, pets, page, pages } = petList

  let keyword = history.location.search
  
  useEffect(() => {
    dispatch(listPets(keyword))

  }, [dispatch, keyword])

  return (
    <div>
      {!keyword && <PetCarousel /> }
      
        <h1>Latest Pets</h1>
        {loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
            :
            <div> 
                <Row>
                    {pets.map(pet => (
                        <Col key={pet._id} sm={12} md={6} lg={4} xl={3}>
                            <Pet pet={pet} />
                        </Col>
                      ))}
                </Row>
                <Paginate page={page} pages={pages} keyword={keyword} />
            </div>
        }
        
    </div>
  )
}

export default HomeScreen