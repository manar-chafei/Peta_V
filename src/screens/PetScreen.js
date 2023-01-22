import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form, Toast } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listPetDetails, createPetReview } from '../actions/petActions'
import {PET_CREATE_REVIEW_RESET} from '../constants/petConstants'


function PetScreen({ match, history }) {
    const [adp, setAdp] = useState(true)
    const [comment, setComment] = useState('')
    
    const dispatch = useDispatch()

    const petDetails = useSelector(state => state.petDetails)
    const { loading, error, pet } = petDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const petReviewCreate = useSelector(state => state.petReviewCreate)
    const { 
        loading: loadingPetReview, 
        error: errorPetReview,
        success: successPetReview, 
     } = petReviewCreate

    useEffect(() => {

        if (successPetReview) {
            setComment('')
            dispatch({ type: PET_CREATE_REVIEW_RESET })
        }

        dispatch(listPetDetails(match.params.id))

    }, [dispatch, match, successPetReview])

    const addToAdoptionHandler = () =>{
        history.push(`/adoption/${match.params.id}?adp=${adp}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createPetReview(
           match.params.id,{
           comment
        }
        ))
    }


    
  return (
    <div>
        <Link to='/' className='btn btn-light my-3'>Go Back</Link>
        {loading ? 
            <Loader />
            : error
                ? <Message variant='danger'>{error}</Message>
            :(
                <div>
                    <Row>
                        <Col md={6}>
                        <Image src={pet.image} alt={pet.name} fluid />
                        </Col>

                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{pet.name}</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Gender: {pet.gender }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Age: {pet.age} {pet.age > 1 ? 'months' : 'month'} 
                                </ListGroup.Item>


                                <ListGroup.Item>
                                    Description: {pet.description}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Category: {pet.category}
                                </ListGroup.Item>

                                

                            </ListGroup>
                        </Col>
                        
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    
                                    {/* 
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Gender: </Col>
                                            <Col><strong>${pet.gender}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    */}
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status: </Col>
                                            <Col>
                                            {pet.adopted === false ? 'Not Adopted' : 'Adopted'}
                                            </Col>

                                            
                                        </Row>
                                    </ListGroup.Item>

                                    

                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToAdoptionHandler}
                                            className='btn-block' 
                                            disabled={pet.adopted === true} 
                                            type='button'>
                                            Adopt Me
                                        </Button>
                                    </ListGroup.Item>

                                    
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <h4>Reviews</h4>
                            {pet.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                            <ListGroup variant='flush'>
                                {pet.reviews.map((review) => (
                                    
                                        <ListGroup.Item key={review._id}>
                                        <Toast>
                                        <Toast.Header closeButton={false}>
                                            <strong className="mr-auto">{review.name}</strong>
                                            <small>{review.createdAt.substring(0, 10)}</small>
                                        </Toast.Header>
                                        <Toast.Body>{review.comment}</Toast.Body>
                                        
                                        </Toast>

                                        </ListGroup.Item>
                                    

                                ))}

                                <ListGroup.Item>
                                    <h4>Write a review</h4>

                                    {loadingPetReview && <Loader/>}
                                    {successPetReview && <Message variant='success'>Review Submitted</Message>}
                                    {errorPetReview && <Message variant='danger'>{errorPetReview}</Message>}

                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Review</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='5'
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                >

                                                </Form.Control>
                                            </Form.Group>

                                            <Button
                                                disabled={loadingPetReview}
                                                type='submit'
                                                variant='primary'
                                            >
                                                Submit
                                            </Button>

                                        </Form>
                                    ) : (
                                        <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
            )
        }
        
    </div>
  )
}

export default PetScreen