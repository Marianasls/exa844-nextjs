"use client"; 

import styles from './page.module.css'
import React from 'react';
import { useState } from 'react';

function MessageRow({ message }) {
  var Message = message[0];
  var Author = message[1];
  var Date_m = new Date(message[2]).toLocaleString();
  return (
    <tr>
      <td>{Author}</td>
      <td>{Message}</td>
      <td>{Date_m}</td>
    </tr>
  );
}

function SearchBar({filterText, onFilterTextChange}) {
  return (
    <form>
      <p>Procure por uma mensagem</p>
      <input type="text" value={filterText} placeholder="Search..." 
      onChange={(e) => onFilterTextChange(e.target.value)}/>
    </form>
  );
}

function FilterableMessageTable({ messages }) {
  const [filterText, setFilterText] = useState('');
  const rows = [];

  messages.forEach((message) => {
    const messageText = message.toString();
    if (messageText.toLowerCase().indexOf(filterText.toLowerCase() === -1){
      return;
    }
  
    rows.push(
      <MessageRow
        message={message}
        key={`${message[0]}-${message[2]}`} />
    );
  });

  return (
    <div>
      <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
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
    );

}

