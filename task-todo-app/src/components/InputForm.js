import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { addTodo, editData, updateTodo, updateEdit } from '../actions';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Modal from './Modal';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { Paper } from '@material-ui/core';



const useStyles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: 3,
        marginRight: 3,
        marginTop: -3,
        width: 250
    },

    submitButton: {
        marginLeft: 10,
    }
});

class InputForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            payload: {
                username: '',
                taskname: '',
                date:this.formatDate(new Date()),
                id: null
            },
            error:""
        };
        this.username = React.createRef();
        this.taskname = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        let editdata = this.props.editdata;

        if (this.props.isedit && editdata !== null && editdata !== prevProps.editdata) {
            this.setState({ payload: editdata.payload });
            console.log(editdata);
            console.log(this.state);
        }
    }

    validateData(payload) {
        let msg="";
        if(payload.taskname==null||payload.taskname.trim()==""){
            msg = msg+"<b>Taskname cannot be empty</b><br/>";
        }
        if(payload.username==null||payload.username.trim()==""){
            msg = msg+"<b>Username cannot be empty</b><br/>";
        }
        if(payload.date==null||payload.date.trim()==""){
            msg = msg+"<b>date cannot be empty</b><br/>";
        }
        return msg;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        console.log(this.props.isedit);
        console.log('Count : ' + this.state.count);
        const validationmsg=this.validateData(this.state.payload);
        if(validationmsg!==""){
            console.log(validationmsg);
            this.setState({error:validationmsg});
        }
        else{
        
        if (this.props.isedit) {
            console.log(this.state.payload);
            this.props.updateTodo(this.state.payload, this.state.payload.id);
        } else {
            let payload = this.state.payload;
            payload.id = this.state.count;
            console.log(payload);
            this.props.addTodo(payload);
        }
        this.clearValues();
    }
    }
    clearValues = () => {
        this.props.updateEdit(false);

        this.setState({
            count: this.state.count + 1,
            payload: {
                username: '',
                taskname: '',
                date: new Date(),
                id: this.state.count
            }
        })

    }
    padDate(s) { 
        return (s < 10) ? '0' + s : s; 
    }

    formatDate=(date)=>{
        return [this.padDate(date.getMonth()+1), this.padDate(date.getDate()), date.getFullYear()].join('/');
    }
    handleDateChange = (event) => {
        console.log(event);
        const date=this.formatDate(event) ;
        let {payload}=this.state;
        payload.date=date;
        this.setState({ payload: payload,error:"" });
    }
    valueChanged = (event) => {
        let {payload}=this.state;
        payload.username= this.username.current.value;
        payload.taskname=this.taskname.current.value;
        payload.id=this.state.payload.id;
        this.setState({payload:payload,error:""});
    }

    render() {
        const { classes } = this.props;

        return <React.Fragment>
            <Grid item xs={12} xl={3} lg={3}>

            <TextField
                    required
                    value={this.state.payload.username}
                    inputRef={this.username}
                    ref="username"
                    id="standard-required"
                    label="User Name"
                    onChange={this.valueChanged}
                    className={classes.textField}
                />

                <TextField
                    required
                    value={this.state.payload.taskname}
                    inputRef={this.taskname}
                    id="standard-required"
                    label="Task Name"
                    onChange={this.valueChanged}
                    className={classes.textField}
                />

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Reporting Date"
                        onChange={this.handleDateChange}
                        value={this.state.payload.date}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                </MuiPickersUtilsProvider>
                <br />
                <br />
                <Button className={classes.submitButton} variant="contained" onClick={this.handleSubmit} color="primary">
                    Submit
                             </Button>
                <Paper style={{marginTop:15}}><div dangerouslySetInnerHTML={{ __html: this.state.error }} /></Paper>
            </Grid>
                    
        </React.Fragment>
    }
}

const mapStateToProps = (state) => {
    return { editdata: state.edit, isedit: state.isedit };
}
const actionCreators = {
    addTodo,
    updateTodo,
    editData,
    updateEdit
}

// 
export default connect(mapStateToProps, actionCreators)(withStyles(useStyles)(InputForm));