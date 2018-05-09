class Recent extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <section id="services">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <h4 class="mt-5 text-center text-muted">Recently posted tasks</h4>
                <div class="row mt-5">
                  <div class="col-lg-3">
                    <div class="card">
                      <p class="text-muted">Date</p>
                    </div>
                  </div>
                </div>
                <div class="row mt-5">
                  <div class="col-lg-12 text-center">
                    <button class="btn btn-outline-secondary">See more tasks</button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
