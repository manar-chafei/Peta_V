import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Pet({ pet }) {
  return (
    <Card className="my-3 p-3 rounded">
        <Link to={`/pet/${pet._id}`}>
            <Card.Img src={pet.image} />
        </Link>

        <Card.Body>
            <Link to={`/pet/${pet._id}`}>
                <Card.Title as="div">
                    <strong>{pet.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as="div">
                
                    <strong>Added at:</strong> {pet.addedAt.substring(0, 10)}
                
            </Card.Text>

            <Card.Text as="div">
                <strong>Address: </strong> {pet.address}
            </Card.Text>

            <Card.Text as="div">
                <strong>Contact Owner: </strong> {pet.phone}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Pet