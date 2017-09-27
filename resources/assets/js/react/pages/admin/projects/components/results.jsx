import React, {Component} from 'react';
import Axios from 'axios';
import toastr from 'toastr';
import RenderHTML from 'react-render-html';
import _ from 'underscore';
import $ from 'jquery';

import ResultItem from './result-item.jsx';
import ResultFilter from './result-filter.jsx';

let url = window.location.origin + '/api/v1/projects';

class Results extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			projectResults: [],
			project_name: '',
			project_code: '',
		}
	}

	componentDidMount() {
		this.getProjects(url);
		toastr.options.newestOnTop = true;
		toastr.options.showMethod = 'slideDown';
	}

	_getProjectStatus = () => {
		var project_status = new Array();
		$.each($("input[name='project_status[]']:checked"), function() {
			project_status.push($(this).val());
		});
		console.log(project_status);
		return project_status;
	}

	_getProjectManagers = () => {
		var project_managers = new Array();
		$.each($("input[name='project_managers[]']:checked"), function() {
			project_managers.push($(this).val());
		});
		console.log(project_managers);
		return project_managers;
	}

	_getDevelopmentManagers = () => {
		var development_managers = new Array();
		$.each($("input[name='development_managers[]']:checked"), function() {
			development_managers.push($(this).val());
		});
		console.log(development_managers);
		return development_managers;
	}
	_getAccountManagers = () => {
		var account_managers = new Array();
		$.each($("input[name='account_managers[]']:checked"), function() {
			account_managers.push($(this).val());
		});
		console.log(account_managers);
		return account_managers;
	}

	updateProjects = (update_url, event) => {
		event.preventDefault();
		var loader = $('#loader');
		loader.show();

		///////////////
		var project_status = [];
		var dev_managers = [];

		// var projectStatus = []
		// $("input[name='project_status[]']:checked").each(function() {
		// 	projectStatus.push(parseInt($(this).val()));
		// });
		///////////////

		$('input[type="checkbox"]:checked').each(function() {
			var $this = $(this);
			var $name = $this.attr('name');

			if($name == "project_status[]") {
				project_status.push(parseInt($this.val()));
			}
			if($name == "dev_managers[]") {
				dev_managers.push(parseInt($this.val()));
			}

			// console.log(this.state.dev_managers);
		});
		console.log(project_status);
		console.log(dev_managers);
		///////////////
		Axios.post(update_url, {
			project_code: $('input[name=project_code]').val(),
			project_name: $('input[name=project_name]').val(),
			project_status: project_status,
			dev_managers: dev_managers,
		}).then(function(response) {
			this.setState({
				count: response.data.length,
				projectResults: response.data
			});
			loader.fadeOut('slow');
			toastr.success('Results complete.');
		}.bind(this)).catch(function(error) {
			console.log(error);
			toastr.error('Unable to retrieve results, please try again.');
		});
	}

	getProjects(url) {
		var loader = $('#loader');
		loader.show();

		Axios.get(url).then(function(response) {
			this.setState({
				count: response.data.length,
				projectResults: response.data
			});
			loader.fadeOut('slow');
		}.bind(this)).catch(function(error) {
			console.log(error);
		});
	}

	render() {
		let renderedResults;

		if(this.state.count > 0) {
			renderedResults = _.map(this.state.projectResults, (project) => {
				return <ResultItem ref="results" key={project.id} comments={project.comments_count}
						   id={project.id} name={project.name} code={project.code} status={project.status}
						   acct_manager={project.acct_manager} dev_manager={project.dev_manager}
						   project_manager={project.project_manager} trend={project.trend}
						   req_eta={project.req_eta} req_status={project.req_status}
						   dev_eta={project.dev_eta} dev_status={project.dev_status}
						   qa_eta={project.qa_eta} qa_status={project.qa_status}
						   uat_eta={project.uat_eta} uat_status={project.uat_status}
						   prod_eta={project.prod_eta} prod_status={project.prod_status}/>
			});
		}
		else {
			renderedResults = RenderHTML("<tr><td colspan='9'>Sorry, no results found.</td></tr>");
		}

		return (
			<div>
				<ResultFilter updateProjects={this.updateProjects} />

				<div className="data-table">
					<div className="data-table-header">
						<div className="row expanded">
							<div className="large-10 columns">
								<i className="fa fa-bar-chart"></i> Current projects: <span className="counter">{this.state.projectResults.length}</span>
							</div>
							<div className="large-2 columns text-right">
								<a className="no-smoothState" data-toggle="add-project-reveal">
									<i className="fa fa-plus-circle"></i> Add
								</a>
							</div>
						</div>
					</div>

					<div className="data-table-content">

						<table className="idtable">
							<thead>
							<tr>
								<th>Code</th>
								<th>Name</th>
								<th>REQ</th>
								<th>DEV</th>
								<th>QA</th>
								<th>UAT</th>
								<th>PROD</th>
								<th>Trend</th>
								<th>Edit</th>
							</tr>
							</thead>

							<tbody>
								{renderedResults}
							</tbody>
						</table>

					</div>
				</div>

			</div>
		);
	}
}

export default Results;