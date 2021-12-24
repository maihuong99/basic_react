import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Table.css';

Table.propTypes = {
    lists: PropTypes.array,
    deleteButton: PropTypes.func

};

Table.defaultProps = {
    lists: [],
    deleteButton: null
}

function Table(props) {
    const {lists, deleteButton, editButton} = props;
    function onHandleDelete(id){
        deleteButton(id);
    }

    const [newComplete, setComplete] = useState("True");

    const [editIndex, setEditIndex] = useState(0);

    const handleChange = (e) => {
        setComplete(e.target.value);
        console.log(e.target.value);
    };


    function onHandleEdit(index){
        document.querySelector(".emodal").style.display = "block";
        console.log(lists[index].title)
        document.querySelector(".edit_title input").value = lists[index].title;
        console.log(index)
        setEditIndex(index);
    }

    function close(){
        document.querySelector(".emodal").style.display = "none";
    }

    function editTask(){
        var newTitle = document.querySelector(".edit_title input").value;
        editButton(editIndex, newTitle, newComplete);
        document.querySelector(".emodal").style.display = "none";
    }

    return (
        
        <div>
            <div style={{padding: "10px"}} className = "container-fluid">

                <div className="card">
                    <div className = "card-header">List Task</div>
                    <div className="card-body">
                        <table class = "table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Task</th>
                                    <th>Complete</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {lists.map((list,index)=>{
                                    return <tr key = {list.id} id = {list.id} className = "itemTask">
                                    <th>{index+1}</th>
                                    <th>{list.title}</th>
                                    <th>{list.completed===false? "false" : "true"}</th>
                                    <th>
                                        <button className="btn btn-primary" onClick = {()=>onHandleEdit(index)}>Edit</button>&nbsp;
                                        <button className="btn btn-warning" onClick = {()=>onHandleDelete(list.id)}>Delete</button>
                                    </th>
                                </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id="myModal" className="emodal">

                <div className="modal-econtent">
                    <div className="modal-eheader">
                        <h2>Edit My tasks</h2>
                        <span className="close" onClick={close}>&times;</span>
                    </div>
                    <div className="modal-ebody">
                        <div className="edit_title">
                            <p>Title:</p> 
                            <input type="text" placeholder="title thing I need to finish"/>
                        </div>
                        
                        <div class="edit_complete">
                            <p>Completed:</p>
                            <select className="select-item" onChange={handleChange}>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                        
                    </div>
                    <div className="modal-efooter">
                        <button className="edit_cancel" onClick={close}>Cancel</button>
                        <button className="edit_save" onClick={editTask}>Save</button>

                    </div>
                </div>

            </div>

        </div>
    );
}

export default Table;