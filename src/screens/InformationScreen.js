import React, { useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'


function InformationScreen({ history }) {

    const [ address, setAddress ] = useState('')
    const [ city, setCity ] = useState('')
    const [ postalCode, setPostalCode ] = useState('')
    const [ country, setCountry ] = useState('')
    const [ phone, setPhone ] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Submitted')
    }

  return (
    <FormContainer>
        <h2>Contact Information</h2>
        <Form onSubmit={submitHandler}>

            <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter City'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Address'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Country'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='phone'>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='Enter Country'
                        value={phone ? phone : ''}
                        onChange={(e) => {

                            if(e.target.value.length==9) return false;
                            setPhone(e.target.value)}
                        }
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Save
                </Button>

        </Form>
    </FormContainer>
  )
}

export default InformationScreen