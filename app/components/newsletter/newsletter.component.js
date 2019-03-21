import "./newsletter.component.scss";

import {store, view} from "react-easy-state";

import {Link}   from "react-router-dom";
import {Helmet} from "react-helmet";
import {API}    from "../../constants/config.constants";


const Store = store({
    email  : "",
    status : "default",
    message: false,

});

const subscribeRequest = async () => {

    if (!Store.email) {
        return;
    }

    const res = await fetch(`/api/subscribe/${Store.email}`);

    let json = await res.json();

    if (json.status === 400) {
        Store.status  = "error";
        Store.message = json.title;
    }

    if (json.status === "subscribed") {
        Store.status = "success";
    }
};

const isStatus = status => status === Store.status;

const NewsletterComponent = ({title, text}) => {

    return (
        <div data-component="newsletter">

            <div className="newsletter" data-visible={isStatus("default")}>
                <div className="newsletter-title" dangerouslySetInnerHTML={{__html: title}}/>

                <div className="newsletter-text" dangerouslySetInnerHTML={{__html: text}}/>

                <input type="email"
                       className="newsletter-input"
                       placeholder="email@example.com"
                       value={Store.email}
                       onChange={event => Store.email = event.target.value}
                />
                <div className="newsletter-button" onClick={subscribeRequest}>Submit</div>
            </div>

            <div className="newsletter thank-you" data-visible={isStatus("error")}>
                <div className="newsletter-title">{Store.message}!</div>

                <div className="newsletter-text">Please double check the email entered is correct and try again if
                    necessary.
                </div>

                <input type="email"
                       className="newsletter-input"
                       placeholder="email@example.com"
                       value={Store.email}
                       onChange={event => Store.email = event.target.value}
                />
                <div className="newsletter-button" onClick={subscribeRequest}>Submit</div>
            </div>

            <div className="newsletter thank-you" data-visible={isStatus("success")}>
                <div className="newsletter-title">Thank you for subscribing!</div>

                <div className="newsletter-text">
                    You have been successfully added to our mailing list. We will keep you informed of updates and new
                    articles when they appear.
                </div>
            </div>
        </div>
    );
};


export default view(NewsletterComponent);