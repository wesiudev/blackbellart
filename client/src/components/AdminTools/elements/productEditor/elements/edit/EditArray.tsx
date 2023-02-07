import React from 'react';

type EditArray = {
    attributeToChange: string
    setAttributeToChange: Function
    setActionType: Function
    array: any
    currentInputValue: string
    handleProductEditation:Function
}

const EditArray = (props: EditArray) => {
    console.log(props.attributeToChange)
    return(
        <div className="inputMenu">
            <div style={{display:'flex',justifyContent:'flex-start',width:'200px',textAlign:'left'}} className="inputMenu__content">
            <h2>Dodaj rozmiar </h2>
        <div className="inputRow">
          <input
            autoFocus
            onChange={(e) => props.setActionType(e.target.value)}
            type="text"
            placeholder=""
            value={props.currentInputValue}
          />
          <div className="buttons">
          <button
            onClick={() => props.handleProductEditation()}
            className="btnSave"
          >
            Dodaj
          </button>
          <button onClick={() => props.setAttributeToChange("")} className="btnCancel">
                Wyjście
              </button>
              </div>
        </div>
      </div></div>
    )
}

export default EditArray