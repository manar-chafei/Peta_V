import React, { useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { requestMyPetsList } from '../actions/requestActions'

function MyPetRequestScreen({ history, match }) {

    const dispatch = useDispatch()

    const listMyPetsRequests = useSelector(state => state.listMyPetsRequests)
    const { loading, error, requesties } = listMyPetsRequests

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo){
            dispatch(requestMyPetsList())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo])

    const deleteHandler = (id) => {

        if(window.confirm('Are you sure you want to delete this pet?')){
            ///delete pet
        }
        
    }

    const createPetHandler = (pet) => {
        //Add pet
    }
  return (
    <div>
        <Link to='/profile'>
            Go Back
        </Link>

        <Row className='align-items-center'>
            <Col>
                <h1>My Pet's Adoption Requests</h1>
            </Col>
        </Row>

        {loading
            ? (<Loader />)
            : error
                ? (<Message variant='danger'>{error}</Message>)
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Adopter</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {requesties.map(requesty => (
                                <tr key={requesty._id}>
                                    <td>{requesty._id}</td>
                                    <td>{requesty.user.email}</td>
                                    <td>{requesty.addedAt.substring(0, 10)}</td>
                                    <td>{requesty.isAccepted == false ? 'Not Accepted' : 'Accepted'}</td>

                                    <td>
                                        <LinkContainer to={`/accept/${requesty._id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
    </div>
  )
}

export default MyPetRequestScreen