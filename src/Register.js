import React ,{Component} from "react";
class Register extends Component{
    state = {
        formElements: {
            username: {
                type: 'text',
                value: '',
                validator:{
                    required: true,
                    minLength: 5,
                    maxLength: 15
                },
                touched: false,
                error: {status:true,message:''}
            },
            email:{
                type: 'email',
                value: '',
                validator: {
                    required: true,
                    pattern: 'email'
                },
                touched: false,
                error: {status:true,message:''}
            },
            password:{
                type: 'password',
                value: '',
                validator: {
                    required: true,
                    minLength: 8,
                    maxLength: 20
                },
                touched: false,
                error: {status:true,message:''}
            }
            },
            formValid: false
    }
    onFormChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        let updatedForm = {...this.state.formElements};
        updatedForm[name].value = value;
        updatedForm[name].touched = true;
        const validatorObject = this.checkValidator(value,updatedForm[name].validator);
        updatedForm[name].error = {
            status: validatorObject.status,
            message: validatorObject.message
        }
        let formStatus = true;
        for (let name in updatedForm){
            if(updatedForm[name].validator.required === true){
                formStatus = !updatedForm[name].error.status && formStatus;
            }
        }
        this.setState({
            ...this.state,
            formElements: updatedForm,
            formValid: formStatus
        });
    }
    checkValidator = (value,rule) => {
        let valid = true;
        let message = '';
        if(rule.required){
            if (value.trim().lenght === 0) {
                valid = false;
                message = 'required';
            }
        }
        if(value.lenght < rule.minLength && valid) {
            valid = false;
            message = 'less than ${rule.minLength} charactor';
        }
        if(value.lenght > rule.maxLength && valid){
            valid = false;
            message = 'more than ${rule.maxLength} charactor';
        }
        if(rule.pattern === 'email' && valid){
            if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) === false){
                valid = false;
                message = 'invalid email';
            }
        }
        return { status:!valid, message:message};
    }
    getErrorMessage = (name) => {
        return this.state.formElements[name].error.message;
    }
    getInputClass = (name) => {
        const elementErrorStatus = this.state.formElements[name].error.status;
        return elementErrorStatus && this.state.formElements[name].touched ? 
            'form-control is-invalid' : 'form-control is-valid';
    }
    onFormSubmit = (event) => {
        event.preventDefault();
        const formData = {};
        for (let name in this.state.formElements){
            formData[name] = this.state.formElements[name].value;
        }
        console.log(formData);
    }
    render() {
        return (
            <div className="row"><div className = "col-sm-3 mt-5"></div>
            <div className ="col-sm-6 mt-5 card">
              <div className ="card-body ml-3 mr-3 mt-5 mb-1">
                  <form onSubmit={this.onFormSubmit}>
                      <div className = "form-group">
                          <label htmlFor="username">Username</label>
                          <input type="text"
                                className ={this.getInputClass('username')}
                                id="username"
                                name="username"
                                onChange= {this.onFormChange} />
                                <div className="invalid-feedback">{this.getErrorMessage('username')}</div>
                      </div>
                      <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input type="email"
                                className ={this.getInputClass('email')}
                                id="email"
                                name="email"
                                onChange={this.onFormChange} />
                                <div className="invalid-feedback">{ this.getErrorMessage('email')}</div>
                      </div>
                      <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <input type="password"
                                className ={this.getInputClass('password')}
                                id="password"
                                name="password" 
                                onChange={this.onFormChange}/>
                                <div className="invalid-feedback">{this.getErrorMessage('password')}</div>
                      </div>
                      <div className="text-center">
                          <button type="submit"
                                className="btn btn-primary" disabled={!this.state.formValid}>Register</button>
                      </div>
                      </form>
                      </div>  
            </div>
            <div className ="col-sm-3 mt-5"></div>
            </div>
            )
    }
}
export default Register;