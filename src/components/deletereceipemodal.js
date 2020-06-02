import React ,{ useState } from 'react'


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
                                <h5 className="modal-title" id="deleteReceipeModal"> </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <div className="row">
                                <h4>Enter the receipe name, <b>{props.receipeName}</b> to confirm your deletion</h4>
                            </div>
                            <br/>
                            <div className="row">
		                        <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Enter receipe name" onChange={changeReceipeName}></input>
                                </div>
                            </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-dismiss="modal" onClick={props.deleteReceipe(props.receipeId,enteredReceipeName)} >Delete</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default DeleteReceipeModal