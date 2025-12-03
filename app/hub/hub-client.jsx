'use client'

import { updateList, createList, removeList, getData } from './actions.js';
import { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form"

  

export default function HubClient(myData) {
    if (!myData) {
        return <div>Laden...</div>;
    }
    const [data, setData] = useState(myData.myData);
    const indexRef = useRef(0);
	const {
		register,
    	handleSubmit,
		reset,
    	formState: { errors },
 	} = useForm()

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

    async function CreateChecklist(data) 
	{
		await createList(data);
		const newData = await getData();
		setData(newData);
		reset();
    }

    function DeleteChecklist(id) {
        removeList(id)
    }

    return (
        <div id="hub-wrapper">
			<div>
				<form 
					onSubmit={ handleSubmit(CreateChecklist) }
					className='flex flex-col m-3 p-4 bg-blue-200 text-black'>  
                    <label>
                        <input type="text" name="titel" placeholder="Titel" {...register("titel", { required: true })} />
					</label>
					<label>
                        <input type="text" name="beschreibung" placeholder="Beschreibung" {...register("beschreibung", { required: true })} />           
					</label>
					<label>
						isPublic:
						<input type='checkbox' {...register("isPublic")}/>
					</label>
                	<button>Submit</button>                 
                </form>
			</div>
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