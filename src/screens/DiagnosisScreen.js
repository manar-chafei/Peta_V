import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Form, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'

import MyDiagnosis from '../components/DiagnosisType'


const DiagnosisScreen = () => {

  const [showPage, setShowPage] = useState(true)

  const onCompletePage = useCallback((data) => {
    console.log(data)
    setShowPage(!showPage)
  },[showPage])

  const setFinalPage = () => {
    return (
      <main>
        <div>
          <Alert variant="danger">
            <Alert.Heading>Reminder!</Alert.Heading>
            <p>
              the results and advice provided by Peta V can not replace a medical consultation and does not constitute a professional diagnosis.
            </p>
          </Alert>
        </div>
      </main>
    )
  }

  return (
    <div>
        {
          showPage?
          <MyDiagnosis showCompletedPage={data=>onCompletePage(data)}/>:
          setFinalPage()
        }
    </div>
  )
}

export default DiagnosisScreen