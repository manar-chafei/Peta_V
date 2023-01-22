import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopPets } from '../actions/petActions'

function PetCarousel() {
    const dispatch = useDispatch()

    const petTop = useSelector(state => state.petTop)
    const {error, loading, pets } = petTop

    useEffect(() => {
        dispatch(listTopPets())
    }, [dispatch])

  return ( 
    loading ? <Loader />
    :error
    ? <Message variant='danger'></Message>
    : (
        <Carousel pause='hover' className='bg-dark'>
            {pets.map(pet => (
                <Carousel.Item key={pet._id}>
                    <Link to={`/pet/${pet._id}`}>
                        <Image src={pet.image} alt={pet.name} fluid />
                        <Carousel.Caption className='carousel.caption'>
                            <h4>{pet.name} ({pet.age} {pet.age > 1 ? 'months' : 'month'})</h4>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )

  )
}

export default PetCarousel