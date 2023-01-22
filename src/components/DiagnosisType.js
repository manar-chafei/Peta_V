import React from 'react'
import * as Survey from 'survey-react'
import 'survey-react/survey.css'
import elements from '../question'

const MyDiagnosis = (prop) => {
    return(
        <Survey.Survey
            showCompletedPage={false}
            onComplete={data=>prop.showCompletedPage(data.valuesHash)}
            json={elements}
        />
    )
}

export default MyDiagnosis
