import React, {useState, useEffect} from 'react';
import Table from "./Table";
import ButtonSearch from "./ButtonSearch"


function Content() {
    const [lists, setLists] = useState([]);

    const [searchList, setSearchList] = useState([])
    async function getLists(){
        fetch("http://localhost:3000/posts")
           .then(response => response.json())
           .then(response =>{
               setLists(response);
               setSearchList(response);
           })
    }

    useEffect(() =>{
        getLists();
    }, [])

    function onHandleAdd(newTask) {
        var data = {
            userId: 1,
            title: newTask,
            completed: false
        }

        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        console.log(JSON.stringify(data))

        fetch("http://localhost:3000/posts",options)
            .then(response => response.json())
            .then(data=>{
                console.log(data)
                getLists();
            })
    }

    function onHandleSearch(searchText) {
        var searchList = lists.filter(list =>{
            return list.title.indexOf(searchText) > -1;
        })
        setSearchList(searchList);
        console.log(searchList)
    }

    function onHandleDelete(id){
        console.log(id)
        document.getElementById("searchText").value = "";
        fetch("http://localhost:3000/posts/"+id, {method: "DELETE"})
            .then(response => response.json())
            .then(()=>{
                getLists();
            })
    }

    function onHandleEdit(index, newTitle, newComplete){
        var data = {
            userId: 1,
            title: newTitle,
            completed: newComplete,
        }

        var id = lists[index].id

        var options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch("http://localhost:3000/posts/"+id,options)
            .then(response => response.json())
            .then(data=>{
                console.log(data);
                getLists();
            })

     
    }

    return (
        <div>
            <ButtonSearch addButton = {onHandleAdd} searchButton = {onHandleSearch}/>
            <Table lists= {searchList} deleteButton = {onHandleDelete} editButton = {onHandleEdit}/>
        </div>
    );
}

export default Content;