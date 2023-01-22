import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listMyPets, deletePet, createPet } from '../actions/petActions'
import { PET_CREATE_RESET } from '../constants/petConstants'

function MyPetListScreen({ history, match }) {

    const dispatch = useDispatch()

    const petListMy = useSelector(state => state.petListMy)
    const { loading, error, pets } = petListMy

    const petDelete = useSelector(state => state.petDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = petDelete

    const petCreate = useSelector(state => state.petCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, pet: createdPet } = petCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: PET_CREATE_RESET })

        if(!userInfo){
            history.push('/login')
        }

        if(successCreate){
            history.push(`/user/pet/${createdPet._id}/edit`)
        } else {
            dispatch(listMyPets())
        }
    

    }, [dispatch, history, userInfo, successDelete, successCreate, createdPet])

    const deleteHandler = (id) => {

        if(window.confirm('Are you sure you want to delete this pet?')){
            dispatch(deletePet(id))
        }
        
    }

    const createPetHandler = () => {
        dispatch(createPet())
    }
  return (
    <div>
        <Link to='/profile'>
            Go Back
        </Link>

        <Row className='align-items-center'>
            <Col>
                <h1>Pets</h1>
            </Col>

            <Col className='text-right'>
                <Button className='my-3' onClick={createPetHandler}>
                    <i className='fas fa-plus'></i> Add Pet
                </Button>
            </Col>
        </Row>

        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

        {loading
            ? (<Loader />)
            : error
                ? (<Message variant='danger'>{error}</Message>)
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Owner</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {pets.map(pet => (
                                <tr key={pet._id}>
                                    <td>{pet._id}</td>
                                    <td>{pet.name}</td>
                                    <td>{pet.category}</td>
                                    <td>{pet.adopted === false ? 'Not Adopted' : 'Adopted'}</td>
                                    <td>{pet.user.name}</td>

                                    <td>
                                        <LinkContainer to={`/user/pet/${pet._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(pet._id)}>
                                            <i className='fas fa-trash'></i>
                                            </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
    </div>
  )
}

export default MyPetListScreen