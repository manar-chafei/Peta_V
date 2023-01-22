const question = {

  "title": "Questions",
  "description": "Choose the right answer",
  goNextPageAutomatic: true,
  
  pages: [

    {
        "elements":[
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
        ]
      },

      {
        "elements":[

          {
            "type": "html",
            "name": "Answer 1",
            "html": "<h1>Advice 1 </h1> <p>It looks like your pet has: <br> <strong> A heat Stroke </strong> <br> Follow our advice and your animal will once again be on its feet to play with you.<br>Our advices: <br> <strong> - place it in a cool place away from the direct sunlight <br>- hydrate a lot your pet </strong><br> <h6>If you want the advice of a specialist, here are the specialized veterinarians for your animal: </h6> <br> SOS véto Cabinet, Dr Ali, +216 28 197 667 (2km) <br> Clinique Vétérinaire Bardo1, Dr Amira, +216 56 819 766 (30km)</p>",
            "visibleIf":"{question1} = false or {question2} = 'item1' or {question3} = true or {question4} = 'item2' or {question2} = 'item2'"
            
          },
          {
            "type": "html",
            "name": "Answer 2",
            "html": "<h1>Advice 2 </h1> <p>It looks like your pet has: <br> <strong> severe flu </strong> <br> We advise you to contact a veterinarian as soon as possible. You can download the Peta V diagnostic to give it during your appointment.<br> <h6>Here is a list of specialized veterinarians for your pet </h6> <br> SOS véto Cabinet, Dr Ali, +216 28 197 667 (2km) <br> Clinique Vétérinaire Bardo1, Dr Amira, +216 56 819 766 (30km) <br> <h6>Here are some tips you can already do: </h6> <br>  -hydrate your pet <br>- isolate him from other animals <br>- place it in a cool place away from direct sunlight </p>",
            "visibleIf": "{question2} = 'item4' or {question4} = 'item4' or {question5} = true"
            
          },

        ]
      }

          
          
          

    ],

  }


export default question