/** REACT - Hooks **/
import React, { useState, useEffect } from 'react'

/** Axios - handles REST API calls **/
import axios from "axios";

import logo from './logo.svg';
import './App.css';

function App() {

	/* create REST client instance */
	const client = axios.create({ baseURL: "https://jsonplaceholder.typicode.com/posts" });

	/** the data of the REST API call */
	const [posts, setPosts] = useState([]);

	// the value of the input search field 
	const [name, setName] = useState('');
	
	// the search result
	const [foundInterfaces, setFoundInterfaces] = useState([]);
	
	/** Search Filter on the gathered REST API call**/
	const filter = (e) => {
		const keyword = e.target.value;

		if (keyword !== '') {
			// filter on the complete population
			const results = posts.filter((interfaceItem) => {
			return ( 
				// search in title and body, avoid case sensitive
					interfaceItem.title.toLowerCase().includes(keyword.toLowerCase()) ||
					interfaceItem.body.toLowerCase().includes(keyword.toLowerCase())
				);
		  });
		  	setFoundInterfaces(results); // update the list of interfaces
		} else {
			setFoundInterfaces(posts); // If search field is empty, show all
		}
		setName(keyword);
	  };

	  // GET with Axios
	  useEffect(() => {
		  const fetchPost = async () => {
			 let response = await client.get('?_limit=100');
			 setPosts(response.data);
			 setFoundInterfaces(response.data);
		  };
		  fetchPost();
	   }, []);	

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div className="container">
			<input type="search" value={name} onChange={filter} className="input" placeholder="Filter"/>

			<table border="1">
				<thead>
					<tr className="interface-row-header">
						<th className="">API Name</th>
						<th className="">Description</th>
						<th className="">Type</th>
					</tr>
				</thead>
				<tbody>
			  {foundInterfaces.map((interfaceItem) => {
				 return (
					<tr key={interfaceItem.id} className="interface-row">
						<td className="interface-name">{interfaceItem.title}</td>
						<td className="interface-description">{interfaceItem.body}</td>
						<td className="interface-type">{interfaceItem.userId}</td>
					</tr>
				 );
			  })}
				</tbody>
			</table>
		</div>

    </div>
  );
}

export default App;
