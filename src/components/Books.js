

import React, { useState ,useEffect} from 'react';
import { InputText} from 'primereact/inputtext';
import { InputNumber} from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';

import { Column } from 'primereact/column';

import 'primeflex/primeflex.css';
import axios from 'axios';
const baseURL="http://localhost:5000/books";
const getBooksUrl ="/books";
const addBookUrl ="/book";

//{"bookname","authorname","category"}]
let booklist=[];

export default function Books() {

    const [list, setList] = useState(booklist );

    const [bookNameInput  , setBookNameInput] = useState('');
    const [authorNameInput, setAuthorNameInput] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
/*
    const initialBookState = {
        bookName: '',
        authorName: '',
        category: 'ALL',
        price:''
    }
    const [book  , setBook] = useState(initialBookState);

    const updateBook = (book) => {
        setBook({ bookName: book.bookName, authorName: book.authorName,
            category: book.category, price: book.price })
    }
*/
   React.useEffect(() => {
        getBooks();
    }, []);
   /*

    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setList(response.data);
        });
        console.log("----------------------");
    }, []);

    */
    if (!list) return "No post !"

    async function getBooks() {
        const res = await axios.get("http://localhost:5000/books/books");
      /*  axios.get(baseURL+getUrl).then((response) => { // awaite cevirdik eski kod
            setList(response.data);
        });*/

        setList(res.data);
    }

 /*   async  function addBook(book)
    {
     //   console.log(book);
       // const response = await axios.post('http://localhost:5000/books/book', book);
      //  setList();
    }

  */

    const categories = [
        { label: 'Eğitim', value: 'EG' },
        { label: 'Hukuk', value: 'HKK' },
        { label: 'Siyaset', value: 'SY' },
        { label: 'Çocuk Kitapları', value: 'CCK' },
        { label: 'Edebiyat', value: 'ED' }
    ];

    async function addBook() {
        let bookparam={ bookName : bookNameInput ,authorName: authorNameInput, category:selectedCategory };

        const response = await axios.post('http://localhost:5000/books/book', bookparam)
            .catch(error => {
            console.error('There was an error!', error);
        });

        resetInput();
        getBooks();
    }


    async function  updateBook(rowData)
    {
        let bookparam={bookNameInput,authorNameInput,selectedCategory};
        //todo 3 update put yazılacak
        const response = await axios.post('http://localhost:5000/books/book', bookparam).catch(error => {
            console.error('There was an error!', error);
        });
        //todo 4 yeniden hepsi çekilmesi, arrayin inmemory update inden daha kolay mı?
        /*  bookparam.id=response.data.id;
           console.log(response.data);
           console.log(bookparam);
           let newList=[...list]; newList.push(response.data);
           setList(newList);
           resetInput();*/
    }

    //todo 1 ile  2  arasında ne fark var
   /* function  updateBookInput(rowData) { // function 1
        setBookNameInput(rawData.bookname);
    }*/
    const editBook = (bookRow) => {  // function 2
        console.log(bookRow);
     //todo objeye cevirince->   setProduct({...product});
        setBookNameInput(bookRow.bookname);

    }

    function resetInput() {
        setBookNameInput("");
        setAuthorNameInput("");
        setSelectedCategory('');
    }

    const editProduct = (product) => {
     //   setProduct({...product});
   //     setProductDialog(true);
    }
    function handleAddButton(){
        addBook();
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2"
                        onClick={() => editBook(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"
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
                               <label htmlFor="name1" className="p-col-fixed" >Book Name : </label>

                           </div>
                            <div className="p-col">
                                <InputText value={bookNameInput}
                                           onChange={e => setBookNameInput(e.target.value)}/>
                            </div>
                        </div>
                        <div className="p-field p-grid">
                            <div  className="p-col">
                                  <label htmlFor="name2" className="p-col-fixed">Author Name : </label>
                            </div>
                            <div className="p-col"  align="left">
                                <InputText value={authorNameInput}
                                           onChange={e => setAuthorNameInput(e.target.value)}/>
                            </div>
                        </div>
                        <div className="p-field p-grid">
                            <div  className="p-col" align="left">
                                <label htmlFor="name1" className="p-col-fixed"> Category : </label>
                            </div>
                            <div className="p-col" align="left">
                                <Dropdown style={{width: '250px'}}
                                      value={selectedCategory}
                                      options={categories}
                                      onChange={(e) => {  setSelectedCategory(e.value); }}
                            />
                            </div>

                        </div>

            </div>
        </div>
        <div>
            <div className="p-field p-grid">

              <span >
                    <Button label="Add" onClick={ handleAddButton} icon="pi pi-check" />
                    <Button label="Update" icon="pi pi-check"/>
                    <Button label="Delete" icon="pi pi-trash" />
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
