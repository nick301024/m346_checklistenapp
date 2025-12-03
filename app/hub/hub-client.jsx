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

	async function CreateChecklist(data) {
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
					onSubmit={handleSubmit(CreateChecklist)}
					className="max-w-md mx-auto mt-10 bg-neutral-900 text-white p-8 rounded-2xl shadow-xl space-y-6"
				>
					<h1 className="text-3xl font-bold">Create Checklist</h1>
					<p className="text-neutral-400">Fill in the details below</p>
					<div className="space-y-1">
						<label className="text-sm">Titel</label>
						<input
							type="text"
							placeholder="Titel"
							{...register("titel", { required: true })}
							className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:ring-2 focus:ring-blue-500 outline-none"
						/>
					</div>
					<div className="space-y-1">
						<label className="text-sm">Beschreibung</label>
						<input
							type="text"
							placeholder="Beschreibung"
							{...register("beschreibung", { required: true })}
							className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:ring-2 focus:ring-blue-500 outline-none"
						/>
					</div>
					<div className="flex items-center gap-2">
						<label className="text-sm">isPublic:</label>
						<input
							type="checkbox"
							{...register("isPublic")}
							className="w-4 h-4 accent-blue-500"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-neutral-200 transition"
					>
						Submit
					</button>
				</form>
			</div>
			<div id="hub-header">
				<h1 className="text-3xl font-bold text-center text-white mt-10">Meine Checklisten</h1>

				<div className="p-6 max-w-3xl mx-auto">

					{listData.map((checklist, index) => (
						<div
							key={index}
							className="bg-neutral-900 text-white p-6 rounded-2xl shadow-xl mt-6 space-y-4"
						>
							<h2 className="text-2xl font-semibold">{checklist.titel}</h2>
							<p className="text-neutral-400">{checklist.beschreibung}</p>

							<div className="space-y-2">
								{Object.entries(checklist.entries).map(([entryName, checked], entryIndex) => (
									<label key={entryIndex} className="flex items-center gap-3 text-sm">
										<input
											type="checkbox"
											checked={checked}
											onChange={() => changeEntry(index, entryName)}
											className="w-4 h-4 accent-blue-500"
										/>
										<span>{entryName}</span>
									</label>
								))}

								<form
									onSubmit={(e) => addEntry(e, index)}
									className="flex items-center gap-2 mt-2"
								>
									<input
										type="text"
										name="eintrag"
										placeholder="+ Eintrag"
										className="flex-1 p-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:ring-2 focus:ring-blue-500 outline-none"
									/>
									<button
										className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-neutral-200 transition"
									>
										+
									</button>
								</form>
							</div>
							<button
								onClick={() => DeleteChecklist(checklist.id)}
								className="w-full bg-red-600 text-white py-2 rounded-lg font-mediumhover:bg-red-500 transition"
								>
								Delete
							</button>
						</div>
					))}

				</div>

			</div>
		</div>
	)
}

/*
<form
	onSubmit={handleSubmit(CreateChecklist)}
	className='flex flex-col m-3 p-4 bg-blue-200 text-black'>
	<label>
		<input type="text" name="titel" placeholder="Titel" {...register("titel", { required: true })} />
	</label>
	<label>
		<input type="text" name="beschreibung" placeholder="Beschreibung" {...register("beschreibung", { required: true })} />
	</label>
	<label>
		isPublic:
		<input type='checkbox' {...register("isPublic")} />
	</label>
	<button>Submit</button>
</form> 



				<h1>Meine Checklisten</h1>
				<div className="p-4 bg-green-200 text-black">

					{
						listData.map((checklist, index) => (
							<div className="m-4 bg-red-400 text-black" key={index}>
								<h2>{checklist.titel}</h2>
								<p>{checklist.beschreibung}</p>
								<div>
									{Object.entries(checklist.entries).map(([entryName, checked], entryIndex) => (
										<label key={entryIndex}>
											<input
												type="checkbox"
												onChange={() => changeEntry(index, entryName)}
												checked={checked} />
											{entryName}
										</label>
									))}
									<form onSubmit={(e) => addEntry(e, index)}>
										<input type="text" name="eintrag" placeholder='+ Eintrag' />
										<button>+</button>
									</form>
								</div>
								<button onClick={() => DeleteChecklist(checklist.id)}>Delete</button>

							</div>
						))
					}
				</div>

				*/

				