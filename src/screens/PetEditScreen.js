import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listPetDetails, updatePet } from '../actions/petActions'
import { PET_UPDATE_RESET } from '../constants/petConstants'


function PetEditScreen({ match, history }) {

    const petId = match.params.id

    const [ name, setName ] = useState('')
    const [ image, setImage ] = useState('')
    const [ gender, setGender ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ age, setAge ] = useState(0)
    const [ description, setDescription ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ uploading, setUploading ] = useState(false)

    const dispatch = useDispatch()

    const petDetails = useSelector(state => state.petDetails)
    const { error, loading, pet } = petDetails

    const petUpdate = useSelector(state => state.petUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = petUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PET_UPDATE_RESET })
            history.push('/admin/petlist')
        } else {
            if (!pet.name || pet._id !== Number(petId)) {
                dispatch(listPetDetails(petId))
            } else {
                setName(pet.name)
                setImage(pet.image)
                setGender(pet.gender)
                setCategory(pet.category)
                setAge(pet.age)
                setDescription(pet.description)
                setAddress(pet.address)
                setPhone(pet.phone)
                
            }
        }

        
        
    }, [dispatch, pet, petId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updatePet({
            _id: petId,
            name,
            image,
            gender,
            category,
            age,
            description,
            address,
            phone

        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('pet_id', petId)

        setUploading(true)

        try{
            const config = {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/pets/upload/', formData, config)

            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

  return (
    <div>
        <Link to='/admin/petlist'>
            Go Back
        </Link>

        <FormContainer>
            <h1>edit Pet</h1>

            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            

            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (

                <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        >
                        </Form.Control>

                        <Form.File
                            id='image-file'
                            label='Choose File'
                            custom
                            onChange={uploadFileHandler}
                        >
                        </Form.File>

                        {uploading && <Loader />}
                    </Form.Group>

                    <Form.Group controlId='gender'>
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                            as='select'
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value=''>Select...</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as='select'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value=''>Select...</option>
                            <option value='Dog'>Dog</option>
                            <option value='Cat'>Cat</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='age'>
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type='Number'
                            placeholder='Enter Age'
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='phone'>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter Phone'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    

                <Button type='submit' variant='primary'>
                    Update
                </Button>

            </Form>

            )}
            

        </FormContainer>
    </div>
    
  )
}

export default PetEditScreen