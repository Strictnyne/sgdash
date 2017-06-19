import React from 'react';
import Moment from 'moment';
import Axios from 'axios';

const save_url = window.location.origin + '/api/v1/projects/update/';

class ResultItem extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			editing: false,
			req_status: this.props.req_status,
			dev_status: this.props.dev_status,
			qa_status: this.props.qa_status,
			uat_status: this.props.uat_status,
			prod_status: this.props.prod_status,
		}
	}

	componentDidMount() {
		jQuery.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		});
	}

	edit() {
		this.setState({
			editing: true,
		});
	}

	unEdit() {
		this.setState({
			editing: false,
		});
	}


	dateFormatter(date, full) {
		if(full) {
			if(date) {
				var newDate = Moment(date).format('MM/DD/YY');
			}
			else {
				var newDate = "N/A";
			}
			return newDate;
		}
		else {
			if(date) {
				var newDate = Moment(date).format('MM/DD');
			}
			else {
				var newDate = "N/A";
			}
			return newDate;
		}
	}

	classSetter(status_id) {
		let status_class = "";
		switch(status_id) {
			case 1:
				status_class = "on-track"
				break;
			case 2:
				status_class = "caution"
				break;
			case 3:
				status_class = "at-risk"
				break;
			default:
				status_class = "disabled-text"
		}
		return status_class;
	}

	urlCreator(project_id) {
		let url = '/admin/project/edit/' + project_id;
		return url;
	}

	handleSelectChange(status_name, event) {
		if(status_name === 'req_status') {
			this.setState({
				req_status: event.target.value,
			});
		}
		if(status_name === 'dev_status') {
			this.setState({
				dev_status: event.target.value,
			});
		}
	}

	// handleStateChange(event) {
	// 	this.setState({ req_status: event.target.value }, () => {
	// 		console.log(this.state)
	// 	});
	// }

	renderStaticDisplay() {
		return (
			<tr id="row-static">
				<td>
					{this.props.code}
				</td>
				<td>
					{this.props.name}
				</td>
				<td>
					<span className={this.classSetter(this.state.req_status)}>
						{this.dateFormatter(this.props.req_eta)}
					</span>
				</td>
				<td>
					<span className={this.classSetter(this.state.dev_status)}>
						{this.dateFormatter(this.props.dev_eta)}
					</span>
				</td>
				<td>
					<span className={this.classSetter(this.state.qa_status)}>
						{this.dateFormatter(this.props.qa_eta)}
					</span>
				</td>
				<td>
					<span className={this.classSetter(this.state.uat_status)}>
						{this.dateFormatter(this.props.uat_eta)}
					</span>
				</td>
				<td>
					<span className={this.classSetter(this.state.prod_status)}>
						{this.dateFormatter(this.props.prod_eta)}
					</span>
				</td>
				<td>
					positive - static
				</td>
			</tr>
		);
	}

	render() {
		return this.renderStaticDisplay();
	}
}

export default ResultItem;