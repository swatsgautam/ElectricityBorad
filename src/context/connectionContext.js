import React, {useContext, createContext, useState, useEffect}  from 'react'
import * as XLSX from 'xlsx'  // library for parsing excel files 

const ConnectionContext = createContext() //Creates a context object to hold and share state across components

const ConnectionProvider = ({children}) =>{
    const [connections, setConnections] = useState([]); //Stores an array of connection data and 
    const [selectedConnection, setSelectedConnection] = useState(null); //Stores the currently selected connection (initially null)
    const [searchTerm, setSearchTerm] = useState(''); //Stores the search term for filtering connections
    const [startDate, setStartDate] = useState(''); //Stores the start date for filtering connections
    const [endDate, setEndDate] = useState(''); //Stores the end date for filtering connections

    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await fetch('/data.csv'); //Fetches the CSV file from data.csv.
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              //Converts the response text to a workbook using XLSX.read, then extracts the first sheet and converts it to JSON format
              const text = await response.text();      
              const workbook = XLSX.read(text, { type: 'string' });
              const sheetName = workbook.SheetNames[0];
              const sheet = workbook.Sheets[sheetName];
              const json = XLSX.utils.sheet_to_json(sheet);
              console.log(json)
      
              setConnections(json); //Sets the connections state with the parsed data
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
        }, [setConnections]);
      


    return(
        <ConnectionContext.Provider value={{connections, setConnections,selectedConnection, setSelectedConnection,searchTerm, setSearchTerm, startDate, setStartDate,endDate, setEndDate}}>
            {children}
        </ConnectionContext.Provider>
    )
}

const useConnections = () => useContext(ConnectionContext) //custom hook that returns the context value from ConnectionContext

export {ConnectionProvider, useConnections}