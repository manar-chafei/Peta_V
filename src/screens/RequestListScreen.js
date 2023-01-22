import React, { useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listRequests } from '../actions/requestActions'


function RequestListScreen({ history }) {

    const dispatch = useDispatch()

    const requestList = useSelector(state => state.requestList)
    const { loading, error, requests } = requestList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listRequests())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo])

  return (
    <div>
        <h1>Requests</h1>
        {loading
            ? (<Loader />)
            : error
                ? (<Message variant='danger'>{error}</Message>)
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>Accepted</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {requests.map(requesty => (
                                <tr key={requesty._id}>
                                    <td>{requesty._id}</td>
                                    <td>{requesty.user && requesty.user.name}</td>
                                    <td>{requesty.addedAt.substring(0, 10)}</td>
                                    <td>{requesty.isAccepted ? (
                                        requesty.acceptedAt.substring(0, 10)
                                    ) : (
                                        <i className='fa fa-times' style={{ color:'red' }}></i>
                                    )}</td>

                                    <td>
                                        <LinkContainer to={`/request/${requesty._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                            Details
                                            </Button>
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

export default RequestListScreen