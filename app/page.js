"use client"; 

import Image from 'next/image'
import styles from './page.module.css'
import React from 'react';
import { useState } from 'react';


//Coloque o código dos demais componentes aqui...]

function MessageRow({ message }) {
  var Message = message[0];
  var Author = message[1];
  var Date = message[2];
  return (
    <tr>
      <td>{Author}</td>
      <td>{Message}</td>
      <td>{Date}</td>
    </tr>
  );
}

function SearchBar({filterText, onFilterTextChange}) {
  return (
    <form>
      <input type="text" value={filterText} placeholder="Search..." 
      onChange={(e) => onFilterTextChange(e.target.value)}/>
    </form>
  );
}

function MessageTable({ messages, filterText}) {
  const rows = [];
  messages.forEach((message) => {
    var Message = message[0];
    var Author = message[1];
    if (Author.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (Message.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    rows.push(
      <MessageRow
        message={message}
        key={message.Author} />
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Message</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function FilterableMessageTable({ messages }) {
  const [filterText, setFilterText] = useState('');

  return (
    <div>
      <SearchBar filterText={filterText}  onFilterTextChange={setFilterText} />
      <MessageTable messages={messages} filterText={filterText} />
    </div>
  ); 
}


export default function Home() {
    
  const [blogMessages, setBlogMessages] = useState([]);
  
  fetch("https://script.google.com/macros/s/AKfycbzBn3sALe1rYjz7Ze-Ik7q9TEVP0I2V3XX7GNcecWP8NvCzGt4yO_RT1OlQp09TE9cU/exec")
    .then(response => response.json())
    .then(data => {
      setBlogMessages(data);
    });
    
    return (
      <main className={styles.main}>
        <FilterableMessageTable messages={blogMessages} />
      </main>
    )
}

