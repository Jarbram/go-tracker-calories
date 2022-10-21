import React,{useState,useEffect} from "react";
import axios from 'axios';
import {Button,Form,Container,Modal, ModalHeader, ModalBody} from 'react-bootstrap';
import Entry from './single-entry.components';

const Entries =()=>{
    const [entries,setEntries] = useState([])
    const [refreshData,setRefreshData]=useState(false)
    const [changeEntry,setChangeEntry] = useState({"change":false, "id":0})
    const [changeIngredient, setChangeIngredient] = useState({"change":false, "id":0})
    const [newIngredientsName, setNewIngredientsName] = useState("")
    const [addNewEntry, setAddNewEntry] = useState(false)
    const [newEntry,setNewEntry] = useState({"dish":"","ingredients":"","calories":0,"fat":0})


    useEffect(() =>{
        getAllEntries();
    },[])

    if(refreshData){
        setRefreshData(false);
        getAllEntries();
    }


    return(
        <div>
            <Container>
                <Button onClick={()=> setAddNewEntry(true)}>Track Today's calories</Button>
            </Container>

            <Container>
                {entries != null && entries.map((entry,i)=>{
                    <Entry entryData={entry} deleteSingleEntry ={deleteSingleEntry} setChangeIngredient={setChangeIngredient} setChangeEntry={setChangeEntry} />
                })}
            </Container>

            <Modal show={addNewEntry} onHide={()=> setAddNewEntry(false)} centred>
                <Modal.Header closeButton>
                    <ModalTitle>Add Calory Entry</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Dish</Form.Label>
                        <Form.Control onChange={(event)=>{newEntry.dish = event.target.value}}></Form.Control>
                        <Form.Label>Ingredients</Form.Label>
                        <Form.Control onChange={(event)=>{newEntry.ingredients = event.target.value}}></Form.Control>
                        <Form.Label>Calories</Form.Label>
                        <Form.Control onChange={(event)=>{newEntry.calories = event.target.value}}></Form.Control>
                        <Form.Label>Fat</Form.Label>
                        <Form.Control type="number" onChange={(event)=>{newEntry.fat = event.target.value}}></Form.Control>
                    </Form.Group>
                    <Button onClick={()=> addSingleEntry()}>Add</Button>
                    <Button onClick={()=> setAddNewEntry(false)}>Cancel</Button>
                </Modal.Body>
            </Modal>

            <Modal show={changeIngredient.change} onHide={()=> setChangeIngredient({"change": false,"id":0})} centred>
                <Modal.Header closeButton>
                    <Modal.Title>Change Ingredients</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>New Ingredients</Form.Label>
                        <Form.Control onChange={(event)=>{setNewIngredientsName(event.target.value)}}></Form.Control>
                    </Form.Group>
                    <Button onClick={()=> changeIngredientForEntry()}>Change</Button>
                    <Button onClick={()=> setChangeIngredient({"change":false, "id":0})}>Cancel</Button>
                </Modal.Body>
            </Modal>

            <Modal show={changeEntry.change} onHide={()=>setChangeEntry({"change":false, "id":0})}>
                <Modal.Header CloseButton>
                    <Modal.Title>Change Entry</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <Form.Group>
                        <Form.Label>Dish</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.dish = event.target.value}}></Form.Control>
                        <Form.Label>Ingredients</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.ingredients = event.target.value}}></Form.Control>
                        <Form.Label>Calories</Form.Label>
                        <Form.Control onChange={(event) => {newEntry.calories = event.target.value}}></Form.Control>
                        <Form.Label>Fat</Form.Label>
                        <Form.Control type="number" onChange={(event) => {newEntry.fat = event.target.value}}></Form.Control>
                    </Form.Group>
                    <Button onClick={() => changeSingleEntry()}>Change</Button>
                    <Button onclick={() => setChangeEntry({"change":false, "id":0})}>Cancel</Button>
                </ModalBody>
            </Modal>
        </div>
    );
    function addSingleEntry(){
        setAddNewEntry(false);
        var url = "http://localhost:8000/entry/create"
        axios.post(url,{
            "ingredients":newEntry.ingredients,
            "dish":newEntry.dish,
            "calories":newEntry.calories,
            "fat":parseFloat(newEntry.fat)
        }).then(response => {
            if (response.status == 200){
                setRefreshData(true)
            }
        })
    }
    
    function deleteSingleEntry(id){
        var url ="http://localhost:8000/entry/delete" + id
        axios.delete(url,{
    
        }).then (response => {
            if (response.status == 200){
                setRefreshData(true)
            }
        })
    }
    
    function getAllEntries(){
        var url = "http://localhost:8000/entries"
        axios.get(url,{
            responseType: "json",
        }).then(response => {
            if(response.status == 200){
                setEntries(response.data)
            }
        })
    }
}

