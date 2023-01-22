import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listPets, deletePet, createPet } from '../actions/petActions'
import { PET_CREATE_RESET } from '../constants/petConstants'



function PetListScreen({ history, match }) {

    const dispatch = useDispatch()

    const petList = useSelector(state => state.petList)
    const { loading, error, pets, pages, page } = petList

    const petDelete = useSelector(state => state.petDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = petDelete

    const petCreate = useSelector(state => state.petCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, pet: createdPet } = petCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = history.location.search

    useEffect(() => {
        dispatch({ type: PET_CREATE_RESET })

        if (!userInfo.isAdmin){
            history.push('/login')
        }

        if(successCreate){
            history.push(`/admin/pet/${createdPet._id}/edit`)
        } else {
            dispatch(listPets(keyword))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdPet, keyword])

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
                    <div>
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
                                            <LinkContainer to={`/admin/pet/${pet._id}/edit`}>
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
                            <Paginate pages={pages} page={page} isAdmin={true} />
                        </Table>
                    </div>
                )}
    </div>
  )
}

export default PetListScreen