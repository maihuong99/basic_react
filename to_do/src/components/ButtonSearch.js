import React from 'react';
import PropTypes from 'prop-types';

ButtonSearch.propTypes = {
    addButton: PropTypes.func,
    searchButton: PropTypes.func

};

ButtonSearch.defaultProps = {
    addButton: null,
    searchButton: null
}

function ButtonSearch(props) {
    const {addButton, searchButton} = props;

    function search(){
        var searchText = document.getElementById("searchText").value;
        console.log(searchText);
        document.getElementById("txtNewTask").value = ""
        document.getElementById("newTask").style.display = "none"
        searchButton(searchText);    
    }

    function add() {
        document.getElementById("newTask").style.display = "block"
    }

    function handleAddNewTask(){
        var task = document.getElementById("txtNewTask").value;

        addButton(task);
        document.getElementById("txtNewTask").value = ""
        document.getElementById("newTask").style.display = "none"
    }

    function handleCancel(){
        document.getElementById("txtNewTask").value = ""
        document.getElementById("newTask").style.display = "none"
        
    }

    return (
    <div>
        <div className = "row" style = {{padding: "10px"}}>
            <div class="input-group mb-3 col-6">
                <input type="text" class="form-control" placeholder="Search Task" id = "searchText" onChange={search} onMouseDown = {search}/>
                <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2" onclick = {search}>Go!!!</span>
                </div>
            </div>

            <div className = "col-6">
                <button className = "btn btn-primary container-fluid" onClick = {add}>Add Task</button>
            </div>

            
        </div>

        
        <div id = "newTask" style ={{display: "none", textAlign: "left"}}>
            <label>New Task: </label><br/>
            <input type = "text" placeholder = "New Task" id = "txtNewTask"/><br/><br/>
            <button className = "btn btn-primary" onClick = {handleCancel}>Cancel</button>&nbsp;
            <button className = "btn btn-primary" onClick = {handleAddNewTask}>Add</button>

        </div>
    </div>
        
    );
}

export default ButtonSearch;