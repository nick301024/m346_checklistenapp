'use client'

import { updateList, createList, removeList, getData } from './actions.js';
import { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form"

  

export default function HubClient(myData) {
    if (!myData) {
        return <div>Laden...</div>;
    }
    const [listData, setData] = useState(myData.myData);
    const indexRef = useRef(-1);
	const {
		register,
    	handleSubmit,
		reset,
    	formState: { errors },
 	} = useForm()

    useEffect(() => {
		if (indexRef.current >= 0)
        	updateList(listData[indexRef.current]);
    }, [indexRef.current]);
    
    function changeEntry(listIndex, entryName) {
        indexRef.current = listIndex;
		setData(prev => {
			const newData = [...prev]
            const newEntries = { ...newData[listIndex].entries };
            newEntries[entryName] = !newEntries[entryName];
            const updatedItem = {
                ...newData[listIndex],
                entries: newEntries
            }
            newData[listIndex] = updatedItem;
			return newData;
		})
	}

	function addEntry(e, index) {
		e.preventDefault();
		console.log();
		let checklist = listData[index];
		const entryName = e.target.eintrag.value;
		checklist.entries[entryName] = false;
		EditChecklist(index, checklist);
	}

    function EditChecklist(listIndex, updatedList) {
        indexRef.current = listIndex;
        setData(prev => {
            const newData = [...prev];
            newData[listIndex] = updatedList;
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
		setData(prev => {
			return prev.filter(item => item.id !== id);
		})
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
                    listData.map((checklist, index) => (
                        <div className="m-4 bg-red-400 text-black" key={ index }>
                            <h2>{ checklist.titel }</h2>
                            <p>{ checklist.beschreibung }</p>
							<div>
								{ Object.entries(checklist.entries).map(([entryName, checked], entryIndex) => (
                                    <label key={ entryIndex }>
                                        <input
                                            type="checkbox"
                                            onChange={ () => changeEntry(index, entryName) }
                                            checked={ checked }/>
                                            { entryName }
                                    </label>
                                )) }
								<form onSubmit={ (e) => addEntry(e, index) }>
									<input type="text" name="eintrag" placeholder='+ Eintrag' />
									<button>+</button>
								</form>
							</div>
							<button onClick={() => DeleteChecklist(checklist.id)}>Delete</button>
                                
                        </div>
                    ))
			    }
                </div>
            </div>
        </div>
    )
}