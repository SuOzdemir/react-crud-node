

import React, { useState ,useEffect} from 'react';
import { InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Password } from 'primereact/password';
import { Column } from 'primereact/column';

//import './PasswordDemo.css';
import 'primeflex/primeflex.css';

import axios from 'axios';


export default function Users() {

    const [list, setList] = useState('[]' );

    const [userNameInput  , setUserNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (editingUser) {
            setUserNameInput(editingUser.name);
            setEmailInput(editingUser.email);
            setPasswordInput(editingUser.password);
        }
    }, [editingUser]);

    async function getUsers() {
        const res = await axios.get("http://localhost:5000/users/users");
         setList(res.data);
    }


    function resetInput() {
        setUserNameInput("");
        setEmailInput("");
        setPasswordInput('');
        setEditingUser(null);
    }

    async function handleSaveButton() {
        console.log("**********************");

        const userparam = { name : userNameInput ,email: emailInput, password:passwordInput };

        console.log("**********************"+userparam);
        if (editingUser) {
            userparam.id = editingUser.id;
        }
        const axiosFunc = editingUser ? axios.put : axios.post;

        try {
            await axiosFunc('http://localhost:5000/users/user', userparam)
            getUsers();
            resetInput();
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    async function handleDeleteButton(rowData) {
        try {
            await axios.delete(`http://localhost:5000/users/user`, {params: {id: rowData.id}});
            getUsers();
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    function handleCancelButton(){
        resetInput();
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2"
                        onClick={() => setEditingUser(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"
                        onClick={() => handleDeleteButton(rowData)}
                />
            </React.Fragment>
        );
    }
    //  onClick={() => confirmDeleteProduct(rowData)} />
    //     onClick={() => editProduct(rowData)} />

    return (
        <>
            <div>
                <div className="w3-panel w3-red">

                    <div className="p-field p-grid">
                        <div className="p-col">
                            <label htmlFor="name1" className="p-col-fixed" >User Name : </label>

                        </div>
                        <div className="p-col">
                            <InputText value={userNameInput}
                                       onChange={e => setUserNameInput(e.target.value)}/>
                        </div>
                    </div>
                    <div className="p-field p-grid">
                        <div  className="p-col">
                            <label htmlFor="name2" className="p-col-fixed">Email : </label>
                        </div>
                        <div className="p-col"  align="left">
                            <InputText value={emailInput}
                                       onChange={e => setEmailInput(e.target.value)}/>
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <div  className="p-col" align="left">
                            <label htmlFor="name1" className="p-col-fixed"> Password : </label>
                        </div>
                        <div className="p-col" align="left">
                            <Password  style={{width: '250px'}}
                                      value={passwordInput}
                                      onChange={(e) => {  setPasswordInput(e.value) }}
                                          toggleMask  />
                        </div>

                    </div>

                </div>
            </div>
            <div>
                <div className="p-field p-grid">

              <span >
                    <Button label={editingUser ? 'Update' : 'Add'} onClick={ handleSaveButton} icon="pi pi-check" />
                    <Button label="Cancel" onClick={ handleCancelButton} icon="pi pi-check" />
                </span>
                </div>
            </div>
            <div>
                <h4>Library</h4>
                <DataTable value={list}>
                    <Column field="book_name" header="Book Name"></Column>
                    <Column field="author_name" header="Author Name"></Column>
                    <Column field="category" header="Category"></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

        </>
    );

}
