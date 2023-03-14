import { Field, Formik, Form, ErrorMessage } from "formik";
import moment from "moment/moment";
import { Component } from "react";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";


class TodoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.params.id,
            description: "Learn Forms",
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }
    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUser()
        let todo = {
            id: this.state.id,
            username: username,
            description: values.description,
            targetDate: values.targetDate
        }
        if (this.state.id == -1) {
            TodoDataService.createTodo(username,todo)
        } else {
            TodoDataService.updateTodo(username, this.state.id, todo)
        }
    }

    componentDidMount() {
        if (this.state.id == -1) {
            return
        }
        TodoDataService.retrieveTodo(AuthenticationService.getLoggedInUser(), this.state.id)
            .then(response => this.setState({ description: response.data.description, targetDate: moment(response.data.targetDate).format('YYYY-MM-DD') }))
    }
    validate(values) {

        let errors = {}
        if (!values.description) {
            errors.description = "Enter a description"
        } else if (values.description.length < 5) {
            errors.description = "should have 5 characters";
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = "Enter a valid date"
        }
        return errors

    }
    render() {
        // let description = this.state.description
        // let targetDate = this.state.targetDate
        //similarily we can write this
        let { description, targetDate } = this.state
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    {/* if the name of key and value is same we can simply write names without assigning the values */}
                    <Formik initialValues={{ description, targetDate }}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        enableReinitialize={true}>{
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"></Field>
                                    </fieldset>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"></ErrorMessage>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"></Field>
                                    </fieldset>
                                    <button type="submit" className="btn btn-success">Save</button>
                                </Form>
                            )
                        }</Formik>
                </div>
            </div>
        )
    }
}

export default TodoComponent