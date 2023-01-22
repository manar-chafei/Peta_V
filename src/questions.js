const diagnosis = {
  "description": "Pet Diagnosis",
  "logoPosition": "right",
  "pages": [
   {
    "name": "page1",
    "elements": [
     {
      "type": "boolean",
      "name": "question1",
      "title": "Is your pet hydrating normally?",
      "isRequired": true
     },
     {
      "type": "radiogroup",
      "name": "question2",
      "title": "Your pet eats...",
      "isRequired": true,
      "choices": [
       {
        "value": "item1",
        "text": "Normally"
       },
       {
        "value": "item2",
        "text": "A lot"
       },
       {
        "value": "item3",
        "text": "Little"
       },
       {
        "value": "item4",
        "text": "Not at all"
       }
      ]
     },
     {
      "type": "radiogroup",
      "name": "question4",
      "title": "How does it breathe?",
      "isRequired": true,
      "choices": [
       {
        "value": "item1",
        "text": "Normally"
       },
       {
        "value": "item2",
        "text": "Speedily"
       },
       {
        "value": "item3",
        "text": "with difficulty"
       },
       {
        "value": "item4",
        "text": "loudly"
       }
      ]
     },
     {
      "type": "boolean",
      "name": "question3",
      "title": "Does your animal with an open mouth?",
      "isRequired": true
     },
     {
      "type": "boolean",
      "name": "question5",
      "title": "Does your pet move around a lot?",
      "isRequired": true
     }
    ],
    "title": "Questions",
    "description": "Choose the right answer"
   }
  ],
  "triggers": [
   {
    "type": "runexpression",
    "expression": "{question1} = false or {question2} = 'item1' or {question3} = true or {question4} = 'item2' or {question2} = 'item2'",
    "runExpression": "Answer 1"
   },
   {
    "type": "runexpression",
    "expression": "{question2} = 'item4' or {question4} = 'item4' or {question5} = true",
    "runExpression": "Answer 2"
   }
  ],
  "calculatedValues": [
   {
    "name": "var1"
   }
  ]
 }
  
  
  export default diagnosis