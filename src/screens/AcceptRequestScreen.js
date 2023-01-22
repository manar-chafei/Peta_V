import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getRequestDetails, acceptRequest } from '../actions/requestActions'
import { REQUEST_ACCEPT_RESET } from '../constants/requestConstants'


function AcceptRequestScreen({ match, history }) {

    const requestId = match.params.id
    const dispatch = useDispatch()


    const requestDetails = useSelector(state => state.requestDetails)
    const { request, error, loading } = requestDetails

    const requestAccept = useSelector(state => state.requestAccept)
    const { loading: loadingAccept, success: successAccept } = requestAccept

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {

        if(!userInfo){
            history.push('/login')
        }
        
        if (!request || request._id !== Number(requestId) || successAccept) {
            dispatch({ type: REQUEST_ACCEPT_RESET })

            dispatch(getRequestDetails(requestId))
        }

    }, [dispatch, request, requestId, successAccept])

    const acceptHandler = () => {
        dispatch(acceptRequest(request))
    }

    

    return loading ? (
        <Loader/>

    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <h1>Request: {request._id}</h1>
            
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                    <ListGroup.Item>
                            <h3>Adopter Informations</h3>
                            <p><strong>Name:</strong> {request.user.name}</p>
                            <p><strong>Email:</strong> <a href={`mailto:%{request.user.email}`}>{request.user.email}</a></p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Request Status</h3>

                            <p>
                                <strong>Status: </strong>
                                
                            </p>
                            {request.isAccepted ? (
                                <Message variant='success'>Accepted On {request.acceptedAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Accepted Yet</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Requested Pets</h2>
                            {request.requestItems.length === 0 ? <Message variant='info'>
                                You have no adoption request
                            </Message> : (
                                    <ListGroup variant='flush'>
                                        {request.requestItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/pet/${item.pet}`}>{item.name}</Link>
                                                    </Col>

                                                    
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={4}>
                            <Card>
                                {loadingAccept && <Loader />}
                                {userInfo && !request.isAccepted && (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={acceptHandler}
                                        >
                                            Mark As Accepted
                                        </Button>
                                    </ListGroup.Item>
                                )}
                            </Card>
                        </Col>

            </Row>
        </div>
    )
}

export default AcceptRequestScreen