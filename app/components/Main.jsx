// imports React Component class
import React, { Component } from 'react';

// declares Main component as ES6 class, which will be this file's export
class Main extends Component {

    constructor() {
        super();

        // set initial state
        this.state = {
            foo: "bar"
        };
    } // end of constructor
    

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
                                <form role="form">

                                    {/* Here we create the text box for capturing the search term*/}
                                    <div className="form-group">
                                        <label htmlFor="search">Search Job Type:</label>
                                        <input type="text" className="form-control" id="search-term"/>
                                    </div>

                                    {/* Here we capture the number of records that the user wants to retrieve  */}
                                    <div className="form-group">
                                        <label htmlFor="pwd">Number of Job Searches to Retrieve:</label>
                                        <select className="form-control" id="num-records-select">
                                            <option value="1">1</option>
                                            {/* Setting the option for 5 as default */}
                                            <option value="5" value>5</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>

                                    {/* Here we have our final submit button */} 
                                    <button type="submit" className="btn btn-default pull-left" id="run-search"><i className="fa fa-search" aria-hidden="true"></i> Search</button>
                                    <button type="button" className="btn btn-default pull-right" id="clear-all"><i className="fa fa-trash"></i> Clear Results</button>

                                </form>
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