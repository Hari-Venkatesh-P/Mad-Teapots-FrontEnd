import React  from 'react';
import { withRouter } from 'react-router';

export default function requireAdminAuth(Component) {

class AdminAuthGuard extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   admin : sessionStorage.getItem("admin"),
  }
 }

 componentDidMount() {
  this.checkAdminAuth();
 }


 checkAdminAuth() {
  const location = this.props.location;
  const redirect = location.pathname + location.search;
  if (sessionStorage.getItem('admin') === null) {
   this.props.history.push(`/login?redirect=${redirect}`);
  }
 }


render() {
  return !(sessionStorage.getItem('admin') === null) ? <Component { ...this.props } /> : null;
  }
 }
 return  withRouter(AdminAuthGuard)

}