import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap'
import Message  from '../components/Message'
import { addToAdoption, removeFromAdoption } from '../actions/adoptionActions'
import { createRequest } from '../actions/requestActions'
import { REQUEST_CREATE_RESET } from '../constants/requestConstants'

function ConfirmationScreen( { match, location, history } ) {


    const requestCreate = useSelector(state => state.requestCreate)
    const { request, error, success } = requestCreate

    const petId = match.params.id
    const adp = location.search ? location.search.split('=')[1] : false
    
    const dispatch = useDispatch()

    const adoption = useSelector(state => state.adoption)
    const { adoptionItems } = adoption


    useEffect( () => {
        if(petId){
          dispatch(addToAdoption(petId, adp))
        }
    }, [dispatch, petId, adp])

    const removeFromAdoptionHandler = (id) => {
        dispatch(removeFromAdoption(id))
    }


    useEffect(() => {
        if (success) {
          history.push(`/request/${request._id}`)
          dispatch({ type: REQUEST_CREATE_RESET })
        }
    }, [success, history])

    const placeRequest = () => {
      dispatch(createRequest({
        requestItems: adoption.adoptionItems
      }))
    }

  return (
    <Row>
      <Col md={8}>
        <h1>Adoption List</h1>
        {adoptionItems.length === 0 ? (
            <Message variant='info'>
              You haven't adopted any pets <Link to='/'>Go Back</Link>
            </Message>
        ) : (
                <ListGroup variant='flush'>
                    {adoptionItems.map(item => (
                        <ListGroup.Item key={item.pet}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                
                                <Col md={3}>
                                <br/>
                                  <Link to={`/pet/${item.pet}`}>{item.name}</Link> <br/>
                                  {item.address} <br/>
                                  {item.phone}
                                  
                                </Col>

                                <Col md={6}>
                                    <Button
                                        type='button'
                                        variant='light'
                                        onClick={ () => removeFromAdoptionHandler(item.pet)}
                                    >
                                        <i className='fas fa-trash'>  Remove from your adoption list </i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h4>You are adopting ({adoptionItems.length} {adoptionItems.length > 1 ? 'pets' : 'pet'} )</h4>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
            {error && <Message variant='danger'>{error}</Message>}
          </ListGroup.Item>

          <ListGroup.Item>
            <Button
              type='button'
              className='btn-block'
              disabled={adoptionItems.length === 0}
              onClick={placeRequest}
            >
              Confirm Adoption
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>

  )
}

export default ConfirmationScreen