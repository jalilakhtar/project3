// imports React Component class
import React, { Component } from 'react';

import axios from 'axios';

// declares Main component as ES6 class, which will be this file's export
class Main extends Component {

    constructor() {
        super();

        // set initial state
        this.state = {
            search_term: "",
            scraped_jobs: [],
            saved_jobs: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.scrape = this.scrape.bind(this);
        this.handleSave = this.handleSave.bind(this);
    } // end of constructor

    componentDidMount() {
        axios.get('/saved/all').then(response => {
            console.log(response.data);
            this.setState({
                saved_jobs: response.data
            });
        }).catch(err =>{
            console.log(err);
        });
    }
    
    handleChange(event) {
        this.setState({
            search_term: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        var search = this.state.search_term;
        this.setState({
            search_term: ""
        });
        console.log(search);
        this.scrape(search);
    }

    handleSave(link, title) {
        console.log(link, title);
        axios.post('/save', {job_link: link, job_name: title}).then(response => {
            console.log(response);
            return axios.get('/saved/all');
        }).then(response => {
            this.setState({
                saved_jobs: response.data
            });
        }).catch(err => {
            console.log(err);
        });
    }

    scrape(searchTerm) {
        console.log(this.state);
        axios.get('/scrape?q=' + searchTerm).then((response) => {
            console.log(response.data);
            var newArray = response.data;
            this.setState({
                scraped_jobs: newArray
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    // Here we describe this component's render method
    render() {
        return ( 
            <div className = "container">
                
                {/* Jumbotron for Title */}
                <div className="jumbotron">
                    <h1 className="text-center"><strong><i className="fa fa-search" aria-hidden="true"></i> Search Jobs</strong></h1>
                </div>

                {/* Row for Searching Indeed.com */}
                <div className="row">
                    <div className="col-sm-12">
                        <br/>
                        {/* First panel is for handling the search parameters */}
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>   Search Parameters</strong></h3>
                            </div>
                            <div className="panel-body">

                                {/* Here we create an HTML Form for handling the inputs*/}
                                <form role="form" onSubmit={this.handleSubmit}>

                                    {/* Here we create the text box for capturing the search term*/}
                                    <div className="form-group">
                                        <label htmlFor="search">Search Job Type:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="search_term"
                                            onChange={this.handleChange}
                                            value={this.state.search_term}
                                        />
                                    </div>

                                    {/* Here we have our final submit button */} 
                                    <button type="submit" className="btn btn-default pull-left" id="run-search"><i className="fa fa-search" aria-hidden="true"></i> Search</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<!-- This row will handle all of the retrieved jobs -->*/}
                <div className="row">
                    <div className="col-sm-12">
                        <br/>

                        {/*<!-- This panel will initially be made up of a panel and wells for each of the articles retrieved -->*/}
                        <div className="panel panel-primary">

                            {/*<!-- Panel Heading for the retrieved articles box -->*/}
                            <div className="panel-heading">
                                <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Job Results</strong></h3>
                            </div>

                            {/*<!-- This main panel will hold each of the resulting articles -->*/}
                            <div className="panel-body" id="well-section">
                                { this.state.scraped_jobs.length > 0 && 
                                    this.state.scraped_jobs.map((element, i) => {
                                        return (
                                            <div className="well" key={i}>
                                                <a href={element.link}>
                                                    {element.title}
                                                </a>
                                                <button
                                                    className="btn btn-info pull-right"
                                                    onClick={() => this.handleSave(element.link, element.title)}
                                                >
                                                    Save Job
                                                </button>
                                                <div className="clearfix"></div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/*<!-- This row will handle all of the saved jobs -->*/}
                <div className="row">
                    <div className="col-sm-12">
                        <br/>

                        {/*<!-- This panel will initially be made up of a panel and wells for each of the articles retrieved -->*/}
                        <div className="panel panel-primary">

                            {/*<!-- Panel Heading for the retrieved articles box -->*/}
                            <div className="panel-heading">
                                <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Saved Jobs</strong></h3>
                            </div>

                            {/*<!-- This main panel will hold each of the resulting articles -->*/}
                            <div className="panel-body" id="well-section">
                                { this.state.saved_jobs.length > 0 && 
                                    this.state.saved_jobs.map((element, i) => {
                                        return (
                                            <div className="well" key={i}>
                                                <a href={element.job_link}>
                                                    {element.job_name}
                                                </a>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Export the component back for use in other files
module.exports = Main;