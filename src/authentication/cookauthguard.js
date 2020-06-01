import React  from 'react';
import { withRouter } from 'react-router';

export default function requireCookAuth(Component) {

class CookAuthGuard extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   admin : sessionStorage.getItem("cook"),
  }
 }

 componentDidMount() {
  this.checkCookAuth();
 }


 checkCookAuth() {
  const location = this.props.location;
  const redirect = location.pathname + location.search;
  if (sessionStorage.getItem('cook') === null) {
   this.props.history.push(`/login?redirect=${redirect}`);
  }
 }


render() {
  return !(sessionStorage.getItem('cook') === null) ? <Component { ...this.props } /> : null;
  }
 }
 return  withRouter(CookAuthGuard)

}