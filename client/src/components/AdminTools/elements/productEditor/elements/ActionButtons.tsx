import React from 'react';

type Buttons = {
    handleProductEditation: Function
    quitInput: Function
}

const ActionButtons = (props: Buttons) => {
    return(
            <div className="buttons">
                <button
                  onClick={() => props.handleProductEditation()}
                  className="btnSave"
                >
                  Zapisz
                </button>
                <button onClick={() => props.quitInput()} className="btnCancel">
                  Anuluj
                </button>
              </div>
    )
}

export default ActionButtons