class Signup extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
     this.handleChange = this.handleChange.bind(this)
     this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    if(event.target.id){
      this.setState({
        [event.target.id]: event.target.value
      })
    }else{
      this.setState({
        [event.target.type]: event.target.value
      })
    }
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.signUp(this.state)
    this.setState({
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    })
  }

  render(){
    return (
      <div class="modal fade" id="signupModal" tabindex="-1" role="dialog" aria-labelledby="signupModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-top" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" id="signupModal">Sign Up</h3>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.props.resetErrors}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.handleSubmit}>
            {
              this.props.error?
              <div class="alert alert-danger" role="alert">
                {this.props.error}
              </div>: null
            }
              <div class="modal-body">
                <div class="form-group">
                  <label>First Name</label>
                  <input type="text" id="first_name" onChange={this.handleChange} value={this.state.first_name} class="form-control" placeholder="First Name" required />
                </div>
                <div class="form-group">
                  <label>Last Name</label>
                  <input type="text" id="last_name" onChange={this.handleChange} value={this.state.last_name} class="form-control"  placeholder="Last Name" required />
                </div>
                <div class="form-group">
                  <label>Email address</label>
                  <input type="email"  onChange={this.handleChange} value={this.state.email} class="form-control" placeholder="Email"  required />
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input type="password" onChange={this.handleChange} value={this.state.password} class="form-control" placeholder="Password" required />
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-danger btn-block" >Submit</button>
              </div>
          </form>
          </div>
        </div>
      </div>
    )
  }
}
