class Services extends React.Component{
  render(){
    return <section id="services">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h4 class="mt-5 text-center text-muted">What can we do for you?</h4>
            <div class="row mt-5">
              <div class="col-lg-3">
                <div class="card" data-toggle="modal" data-target="#signupModal">
                  <img class="card-img-top" src="https://www.workingtraveller.com/wp-content/uploads/2015/08/1038x584xhandyman.jpg.pagespeed.ic.EiH2e84r9E.jpg" alt="" />
                  <div class="card-footer text-muted">
                    Handyman Services
                  </div>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="card" data-toggle="modal" data-target="#signupModal">
                  <img class="card-img-top" src="http://nebula.wsimg.com/5acaf68bb4af12bc91b69f0124f53862?AccessKeyId=376756677743E771C432&disposition=0&alloworigin=1" alt=""/>
                  <div class="card-footer text-muted">
                    Garden Maintenance
                  </div>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="card" data-toggle="modal" data-target="#signupModal">
                  <img class="card-img-top" src="https://northwestfire.org/wp-content/uploads/2016/05/Delivery.jpg" alt=""/>
                  <div class="card-footer text-muted">
                    Pickup & Delivery
                  </div>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="card" data-toggle="modal" data-target="#signupModal">
                  <img class="card-img-top" src="http://rosascleaningservicellc.com/wp-content/uploads/sites/4466/2017/09/slide-1.jpg" alt=""/>
                  <div class="card-footer text-muted">
                    House Cleaning
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-5">
              <div class="col-lg-3">
                <div class="card" data-toggle="modal" data-target="#signupModal">
                  <img class="card-img-top" src="https://www.robinsonsrelo.com/wp-content/uploads/2012/03/into-truck-wide.jpg" alt=""/>
                  <div class="card-footer text-muted">
                    Moving & Removals
                  </div>
                </div>
              </div>
              <div class="col-lg-3" data-toggle="modal" data-target="#signupModal">
                <div class="card">
                  <img class="card-img-top" src="https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/qmraJpx/man-putting-together-self-assembly-furniture-in-new-home_41yqbuck__F0000.png" alt=""/>
                  <div class="card-footer text-muted">
                    Furniture Assembly
                  </div>
                </div>
              </div>
              <div class="col-lg-3" data-toggle="modal" data-target="#signupModal">
                <div class="card">
                  <img class="card-img-top" src="http://progressiveitservices.com/wp-content/uploads/2017/07/Managed-IT-Service-Houston-Prgressive-Computing.jpg" alt=""/>
                  <div class="card-footer text-muted">
                    Computer & IT Support
                  </div>
                </div>
              </div>
              <div class="col-lg-3" data-toggle="modal" data-target="#signupModal">
                <div class="card">
                  <img class="card-img-top" src="https://krushartmedia.com/wp-content/uploads/2016/11/Flyer_Mock_Up-dream-wedding.jpg" alt=""/>
                  <div class="card-footer text-muted">
                    Flyer Delivery
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-5">
              <div class="col-lg-12 text-center">
                <button class="btn btn-outline-secondary" onClick={() =>{ this.props.toggleState('browseTasks', 'myTasks', 'dashboard'); this.props.goToTop()}}>See more tasks</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  </section>
  }
}
