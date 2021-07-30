

import React, { useState } from 'react';
import { InputText} from 'primereact/inputtext';
import { InputNumber} from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import 'primeflex/primeflex.css';


export default function Books() {


    const [bookNameInput  , setBookNameInput] = useState('');
    const [authorNameInput, setAuthorNameInput] = useState('');
    const [selectedCategory, setCategoryInput] = useState('');
    const [priceInput, setPriceInput] = useState('');

    const categories = [
        { name: 'Eğitim', code: 'EG' },
        { name: 'Hukuk', code: 'HKK' },
        { name: 'Siyaset', code: 'SY' },
        { name: 'Çocuk Kitapları', code: 'CCK' },
        { name: 'Edebiyat', code: 'ED' }
    ];
    return (
        <div>

            <div className="p-field p-grid">
                <label htmlFor="name1" className="p-col-fixed" >Book Name : </label>
                <div className="p-col">
                    <InputText value={bookNameInput}
                               onChange={e => setBookNameInput(e.target.value)}/>
                </div>
            </div>
            <div className="p-field p-grid">
                <label htmlFor="name2" className="p-col-fixed">Author Name : </label>
                <div className="p-col">
                    <InputText value={authorNameInput}
                               onChange={e => setAuthorNameInput(e.target.value)}/>
                </div>
            </div>
            <div className="p-field p-grid">
                <label htmlFor="name1" className="p-col-fixed"> Category : </label>
                <Dropdown optionLable="-" optionValue={selectedCategory} options={categories}
                          onChange={(e) => {  setCategoryInput(e.value); }}
                />

            </div>
            <div className="p-field p-grid">
                <label htmlFor="name4" className="p-col-fixed" style={{width: '100px'}}>Price : </label>
                <div className="p-col">
                    <InputNumber inputId="locale-us" value={priceInput} onValueChange={(e) => setPriceInput(e.value)}
                                 mode="decimal" locale="en-US" minFractionDigits={2}/>
                </div>
            </div>
        </div>


);

        }
