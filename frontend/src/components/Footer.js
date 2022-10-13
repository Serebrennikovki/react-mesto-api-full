import React from "react";
import { Route, Switch } from 'react-router-dom';
function Footer(){
    return(
        <Switch>
            <Route path="/" exact>
                <footer className="footer">
                    <p className="footer__copyright">&#169; 2022 Mesto Russia</p>
                </footer>
            </Route>
        </Switch>
    )
}
export default Footer;