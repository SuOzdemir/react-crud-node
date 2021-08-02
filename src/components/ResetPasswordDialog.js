import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';



    export default function ResetPasswordDialog() {

    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [displayMaximizable, setDisplayMaximizable] = useState(false);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayBasic2': setDisplayBasic2,
        'displayModal': setDisplayModal,
        'displayMaximizable': setDisplayMaximizable,
        'displayPosition': setDisplayPosition,
        'displayResponsive': setDisplayResponsive
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text"/>
                <Button label="Yes" icon="pi pi-check" onClick={() => onHide(name)} autoFocus/>
            </div>
        );
    }

    return (
        <div className="dialog-demo">
            <div className="card">

                <h5>Responsive</h5>
                <Button label="Show" icon="pi pi-external-link" onClick={() => onClick('displayResponsive')}/>
                <Dialog header="Header" visible={displayResponsive} onHide={() => onHide('displayResponsive')}
                        breakpoints={{'960px': '75vw'}} style={{width: '50vw'}}
                        footer={renderFooter('displayResponsive')}>
                    <p>ddd</p>
                </Dialog>


            </div>
        </div>
    );
}
