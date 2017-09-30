// imports React Component class
import React, { Component } from 'react';

// This is the main component.
//var Main = React.createClass({

    // // Here we set a generic state associated with the number of clicks
    // getInitialState: function() {
    //     return { foo: "bar" };
    // },

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

                hello world { console.log(this.state.foo) }

            </div>
        );
    }
};

// Export the component back for use in other files
module.exports = Main;