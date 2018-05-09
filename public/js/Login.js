class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.logIn(this.state)
    this.setState({
      email: '',
      password: ''
    })
  }
  render(){
    return (
      <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-top" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" id="loginModal">Login</h3>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.props.resetErrors}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form id="loginForm" onSubmit={this.handleSubmit}>
            {
              this.props.success?
              <div class="alert alert-success" role="alert">
                {this.props.success}
              </div>: null
            }
            {
              this.props.error?
              <div class="alert alert-danger" role="alert">
                {this.props.error}
              </div>: null
            }
              <div class="modal-body">
                <div class="form-group">
                  <label>Email address</label>
                  <input type="email" id="email" class="form-control" onChange={this.handleChange} value={this.state.email}  placeholder="Email" required/>
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input type="password" id="password" class="form-control" onChange={this.handleChange} value={this.state.password}  placeholder="Password" required/>
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-danger btn-block">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
