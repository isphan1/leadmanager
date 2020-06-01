import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchLead,destroyLead} from '../../redux/'
import './loading.css'

function Leads({userData,fetchLead,removeLead}) {
    useEffect(()=>{
        fetchLead()
    },[])

    return (
        <div>
        <h1>Leads</h1>

        {
        userData.loading 
        ? 
        <div className="lds-ring">
            <div>
                </div>
                <div>
                    </div>
                        <div>
                    </div>
                  <div>
                </div>
            </div>
        :null
}
        <table className="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Message</th>
            </tr>
        </thead>
            <tbody>
                { userData.leads.map(lead =>
                <tr key={lead.id}>
                <th scope="row">{lead.id}</th>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.message}</td>
                <td><button className="btn btn-danger" onClick={() => removeLead(lead.id)}>Delete</button></td>
                </tr>
                )
                }
            </tbody>
        </table>
        </div>
    )
}

const mapStateToProps = state =>{
    return {
        userData: state.leads
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchLead: () => dispatch(fetchLead),
        removeLead: (id) => dispatch(destroyLead(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Leads)

