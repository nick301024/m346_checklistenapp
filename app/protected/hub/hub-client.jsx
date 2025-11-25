'use client'

export default function HubClient(myData) {
    
    if (!myData) {
        return <div>Laden...</div>;
    }

    const { myData: data } = myData;

    return (
        <div id="hub-wrapper">
            <div id="hub-header">
            <h1>Meine Checklisten</h1>
            <div className="p-4 bg-green-200 text-black">
                {
                    data.map((item, index) => {
                        return (
                            <div key={index}>
                                <p>{item.titel}</p>
                                <p>{item.beschreibung}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div id="header-buttons">
                <button id="new-checklist-btn">+ Neue Checkliste</button>
                <button id="logout-btn">Abmelden</button>
            </div>
            </div>

            <div id="create-checklist-modal">
            <div id="create-checklist-content">
                <input type="text" id="checklist-title" placeholder="Checklisten-Titel" required></input>
                <button id="create-title-btn">Erstellen</button>
                <button id="cancel-btn">Abbrechen</button>
            </div>
            </div>

            <div id="checklists-container">
            <div id="checklists-grid"></div>
            </div>
        </div>
    )
}