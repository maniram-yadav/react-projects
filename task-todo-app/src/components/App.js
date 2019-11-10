import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputForm from './InputForm';
import TodoList from './TodoList';

class App extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>

                <Grid container >
                    <InputForm />
                    <TodoList />
                </Grid>

            </div>
        );
    }
}

export default App;