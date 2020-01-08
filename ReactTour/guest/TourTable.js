import React from "react";
import tourData from "./tours.json";

class TourTable extends React.Component{
    constructor(props) {
		super(props); // Must call
	}
	
render(){
	
let rows = this.props.tourData.tours.map((tourDataRow,index) => 								
<tr key={index}><td>{tourDataRow.name}</td>
<td>{tourDataRow.date}</td></tr>);
	
return (
	<div>
      <h1>Tours</h1>
      <table>
	  <thead>
      <tr><td id="table-header">Name</td>
      <td>Date</td></tr> 
	  </thead>
	  <tbody>
      {rows}
	  </tbody>
      </table> 
      </div>	
);}   
}
export default TourTable;