import "./footer.component.scss";

import {store, view} from "react-easy-state";
import {Link}                 from "react-router-dom";
import LiveStore     from "stores/live.store";


const FooterComponent = () => {

    return (
        <div data-component="footer" data-visible={LiveStore.isContentVisible}>
            <div className="container">
                <div className="footer">
                    <div className="footer-title">
                        THE PLATFORM
                    </div>

                    <div className="footer-links">
                        <div className="footer-link">About Us</div>
                        <div className="footer-link">Contact Us</div>
                        <div className="footer-link">Advertise</div>
                    </div>

                    <div className="footer-links">
                        <div className="footer-link">About Us</div>
                        <div className="footer-link">Contact Us</div>
                        <div className="footer-link">Advertise</div>
                    </div>


                </div>
            </div>

        </div>
    );
};


export default view(FooterComponent);