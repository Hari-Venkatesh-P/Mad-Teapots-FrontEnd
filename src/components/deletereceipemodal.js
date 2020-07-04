import React ,{ useState } from 'react'

import "../styles/views.css"

function DeleteReceipeModal(props){

    const [enteredReceipeName, setEnteredReceipeName] = useState('');

    function changeReceipeName(e)
    {
        setEnteredReceipeName(e.target.value) 
    }

    return(
        <div>
                <div className="modal fade" id="deleteReceipeModal"  role="dialog" aria-labelledby="deleteReceipeModal" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title display" id="deleteReceipeModal">Delete Receipe  : </h5>
                            </div>
                            <div className="modal-body" style={{marginLeft:"20px"}}>
                                <div className="row">
                                        <h6 className="display">Enter the receipe name,"<b>{props.receipeName}</b>"  to confirm your deletion</h6>
                                </div>
                                <div className="row">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Enter receipe name" onChange={changeReceipeName}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-dismiss="modal" onClick={ () => {props.deleteReceipe(props.receipeId,props.receipeName,enteredReceipeName)}} >Delete</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default DeleteReceipeModal