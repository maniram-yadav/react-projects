import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {fetchTodo } from '../actions';
import { connect } from 'react-redux';
import { Button ,IconButton} from '@material-ui/core';

import {editData, deleteTodo,updateEdit } from '../actions';



const useStyles = theme => ({
    margin :{
        // marginLeft:theme.spacing(1),
        // width:20,
        // height:18
        marginTop:0
    },
    iconSize:{
        width:18,
        height:18,
        pointer:'cursor'
        // backgroundColor:'red'
    }
});


const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);

  
class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }

    deleteTodo=(id)=>{
        this.props.deleteTodo(id);
    }
    updateTodo=(id)=>{
        console.log('Id : '+id);
        let payload=this.props.todo.filter(t=>t.id===id);
        this.props.updateEdit(true);
        console.log(payload);
        this.props.editData(payload[0],id);
    }

    render() {
        const {todo}=this.props;
        if(todo){
            console.log(todo);
        }
        const {classes}=this.props;
        console.log(this.props);
        return <React.Fragment>
            <Grid item xs={12} xl={9} lg={9}>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>User Name</StyledTableCell>
                                <StyledTableCell>Task Name</StyledTableCell>
                                <StyledTableCell>Reporting Date</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                              todo.map(row=>(
                                    <StyledTableRow key={row.id}>
                                               <StyledTableCell>{row.username}</StyledTableCell>     
                                               <StyledTableCell>{row.taskname}</StyledTableCell>     
                                               <StyledTableCell>{row.date}</StyledTableCell>     
                                               <StyledTableCell>
                                                <IconButton aria-label="delete" color="secondary"  onClick={()=>this.deleteTodo(row.id)}  className={classes.margin} size="small">
                                                                    <DeleteIcon />
                                                        </IconButton>
                                                        <IconButton aria-label="edit" color="primary" onClick={()=>this.updateTodo(row.id)}  className={classes.margin} size="small">
                                                                    <EditIcon />
                                                        </IconButton>   
                                                 </StyledTableCell>     
                                    </StyledTableRow>       
                              ))
                          }
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>

        </React.Fragment>
    }
}

const mapStateToProps=(state)=>{
    return {todo:state.todo};
}

export default connect(mapStateToProps,{
    fetchTodo,deleteTodo,editData,updateEdit})(withStyles(useStyles)(TodoList));