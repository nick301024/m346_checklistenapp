'use client'

import { updateList, createList, removeList } from './actions.js';
import { useState, useRef, useEffect } from 'react';

export default function HubClient(myData) {
    if (!myData) {
        return <div>Laden...</div>;
    }
    const [data, setData] = useState(myData.myData);
    const indexRef = useRef(0);

    useEffect(() => {
        updateList(data[indexRef.current]);
    }, [indexRef.current]);
    
    function changeEntry(entryIndex, entryName) {
        indexRef.current = entryIndex;
		setData(prev => {
			const newData = [...prev]
            const newEntries = { ...newData[entryIndex].entries };
            newEntries[entryName] = !newEntries[entryName];
            const updatedItem = {
                ...newData[entryIndex],
                entries: newEntries
            }
            newData[entryIndex] = updatedItem;
			return newData;
		})
	}

    function EditChecklist(listIndex, updatedEntry) {
        indexRef.current = listIndex;
        setData(prev => {
            const newData = [...prev];
            newData[listIndex] = updatedEntry;
            return newData;
        })
    }

    function CreateChecklist(list) {
        createList(list);
    }

    function DeleteChecklist(id) {
        removeList(id)
    }

    return (
        <div id="hub-wrapper">
            <div id="hub-header">
                <h1>Meine Checklisten</h1>
                <div className="p-4 bg-green-200 text-black">
                {
                    data.map((checklist, index) => (
                        <div key={ index }>
                            <h2>{ checklist.titel }</h2>
                            <p>{ checklist.beschreibung }</p>
                            <button>Edit</button>
                                { Object.entries(checklist.entries).map(([entryName, checked]) => (
                                    <label key={ entryName }>
                                        <input
                                            type="checkbox"
                                            onChange={ () => changeEntry(index, entryName) }
                                            checked={ checked }/>
                                            { entryName }
                                    </label>
                                )) }
                        </div>
                    ))
			    }
                </div>
            </div>
        </div>
    )
}