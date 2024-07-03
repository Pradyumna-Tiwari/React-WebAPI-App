
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomeCarousel from './HomeCarousel';
import img1 from '../assets/photo1.jpg'
import img2 from '../assets/photo2.jpg'
import img3 from '../assets/photo3.jpg'
import img4 from '../assets/photo4.jpg'
import img5 from '../assets/photo5.jpg'
import img6 from '../assets/photo6.jpg'
import img7 from '../assets/photo7.jpg'

function Home() {

    return (
        <main role="main">
            <HomeCarousel />
            <div className="container marketing">
                <div className="row home_first_div">
                    <div className="col-lg-4">
                        <img className="rounded-circle" src={img3} alt="Generic placeholder image" width="140" height="140" />
                        <h2>Heading</h2>
                        <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
                        <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
                    </div>
                    <div className="col-lg-4">
                        <img className="rounded-circle" src={img2} alt="Generic placeholder image" width="140" height="140" />
                        <h2>Heading</h2>
                        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
                        <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
                    </div>
                    <div className="col-lg-4">
                        <img className="rounded-circle" src={img5} alt="Generic placeholder image" width="140" height="140" />
                        <h2>Heading</h2>
                        <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                        <p><a className="btn btn-secondary" href="#" role="button">View details »</a></p>
                    </div>
                </div>


                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">First featurette heading. <span className="text-muted">It'll blow your mind.</span></h2>
                        <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                    </div>
                    <div className="col-md-5">
                        <img className="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src={img4} data-holder-rendered="true" />
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading">Oh yeah, it's that good. <span className="text-muted">See for yourself.</span></h2>
                        <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                    </div>
                    <div className="col-md-5 order-md-1">
                        <img className="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src={img6} data-holder-rendered="true" />
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">And lastly, this one. <span className="text-muted">Checkmate.</span></h2>
                        <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                    </div>
                    <div className="col-md-5">
                        <img className="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src={img7} data-holder-rendered="true" />
                    </div>
                </div>

                <hr className="featurette-divider" />



            </div>





        </main>
    );
}

export default Home;