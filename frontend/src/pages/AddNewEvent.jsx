import {React, useState} from 'react'
import Navigation from '../components/Navigation'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddNewEvent = () => {
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState("") 
    const [description, setDescription] = useState("") 
    const [location, setLocation] = useState("") 
    const [price, setPrice] = useState(0) 
    const [date, setDate] = useState("") 
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else{
            const eventInfo = {
              title: title,
              description: description,
              location: location,
              price: parseInt(price),
              date: date
            };

            fetch("http://localhost:4000/event/create", {
              method: "POST",
              headers: {
                "Content-Type": "Application/JSON",
              },
              body: JSON.stringify(eventInfo),
            })
              .then((respose) => respose.json())
              .then(() =>  navigate("/"))
              .catch((error) => {
                console.log(error);
              });
          }
          setValidated(true);
    };

  return (
    <>
    <Navigation />
    <main>

    <h1 className='text-center my-[1%]'>Create new event</h1>

    {/* FORM */}
    <div className='mx-[25%] my-[2%]'>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* TITLE */}
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="(e.g. Some title)" required onChange={e => setTitle(e.target.value)}/>
            <Form.Control.Feedback type="invalid">
                Please set the event title.
            </Form.Control.Feedback>

            {/* Description */}
        
            <Form.Label>Description</Form.Label>
            <Form.Control type="txt" placeholder="(e.g. Some description)" required onChange={e => setDescription(e.target.value)}/>
            <Form.Control.Feedback type="invalid">
                Please set the event description.
            </Form.Control.Feedback>
            

            {/* LOCATION */}
           
            <Form.Label>Location</Form.Label>
            <Form.Control type="txt" placeholder="(e.g. Madrid)" required onChange={e => setLocation(e.target.value)}/>
            <Form.Control.Feedback type="invalid">
                Please set the event location.
            </Form.Control.Feedback>
       

            {/* PRICE */}
            
            <Form.Label>Price ($)</Form.Label>
            <Form.Control type="number" min="1" placeholder="(e.g. 29$)" required onChange={e => setPrice(e.target.value)}/>
            <Form.Control.Feedback type="invalid">
                Please set the event price. Price cannot be lower than 1.
            </Form.Control.Feedback>
          

            {/* DATE */}
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" required onChange={e => setDate(e.target.value)}/>
            <Form.Control.Feedback type="invalid">
                Please choose a date for the event.
            </Form.Control.Feedback>

            {/* BUTTON */}
            <div className='flex justify-center mt-2'>
            <Button variant="primary" type="submit">
                Create
            </Button>
            </div>
        </Form>
    </div>
    </main>
    </>
  )
}

export default AddNewEvent