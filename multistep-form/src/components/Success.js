import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import {List,ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'

export class Success extends Component {

    render() {
       
        return (
            <MuiThemeProvider>
            <React.Fragment>
                    <AppBar title="Success"/>
                    <h1>Thank for your submission</h1>
                    <p>You will get email with further instructions</p>
                   
            </React.Fragment>
        </MuiThemeProvider>
                  
        );
    }
}

const styles={
    button:{
        margin:15
    }
}
export default Success
