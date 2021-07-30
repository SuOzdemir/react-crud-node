
import {useState,useEffect} from "react";
import { Button, Popconfirm,Input ,message} from 'antd';
import 'antd/dist/antd.css';


let todos=[];
const todosStr = localStorage.getItem('todos');

if(todosStr){
    todos= JSON.parse(todosStr);
}

function confirm() {
    message.info('Clicked on Yes.');
}

export default function Books()
{

    const [list, setList] = useState(todos );
    const [newTodoInput, setInputText] = useState('');

    useEffect(() => {
        localStorage.setItem('todos',JSON.stringify(list));
    }, [list]);

    function handleCheck(id) {

        let newList=[...list];
        const index = list.findIndex(val => val.id === id ) ;
        const toDo = {...list[index]};
        toDo.done=true;
        newList[index]=toDo;
        setList(newList);

    }

    function handleDelete(id) {
        // eslint-disable-next-line
      //  if(confirm('are you sure?')) {
            const newList = list.filter(val => val.id !== id);
            setList(newList);
      //  }
    }



    function confirm() {
        message.info('Clicked on Yes.');
    }

    return(
        <div className="site-button-ghost-wrapper">

            <Input  value={newTodoInput} onChange={e => setInputText(e.target.value)}  />

            <Button type="primary" ghost onClick={   ()=> {
                    const newList=[...list];
                    newList.push({id:list.length+1,value:newTodoInput,done:false});
                    setList(newList);
                    setInputText('');
                  }
            }
            >Add </Button>

            <ul>
                {list.map(({id,value,done}) => (

                    <li>
                        <div>

                            <label style={{marginRight: '10px', textDecoration: done ? 'line-through' : '' }} > {value} </label>

                            <button  type="primary"  onClick={ () => handleCheck(id)} > Done</button>

                            <Popconfirm placement="topLeft" title="Are you sure?" onConfirm={confirm} okText="Yes" cancelText="No">
                                     <Button  type="primary"  onClick={ () => handleDelete(id) } > Delete</Button>
                            </Popconfirm>

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );


}
