var result = `
				<select id="slt">
				<option>${localStorage.start}</option>
				<option>${localStorage.place1}</option>	
				<option>${localStorage.place2}</option>
				<option>${localStorage.place3}</option>
				<option>${localStorage.end}</option>
				</select>`;
document.getElementById('dropdown').innerHTML = result; 