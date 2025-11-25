export default async function Hub() {

    return(
        <div id="hub-wrapper">
            <div id="hub-header">
            <h1>Meine Checklisten</h1>
            <div>
                { //loop through data 
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