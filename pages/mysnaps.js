import React, {Component} from 'react';
import Layout from '../components/Layout';
import { Button, Card} from 'semantic-ui-react'
import {Link,Router} from '../routes'

class MySnaps extends Component{

  static async getInitialProps(props){
    console.log('in mysnapsjs', this.props.mmm);
    return {};

  }

  homePage = async (event) =>{
    event.preventDefault();
    console.log('in getMySnap fn in mysnaps.js');
    Router.pushRoute('/home');
  }
  render(){
    return(
      <Layout>
        <div>
          <h4>In MySnaps component</h4>
            <Link route='/home'>
              <a>
                <Button color='blue' fluid-size='large'>Back2HomePage</Button>
              </a>
            </Link>
        </div>
      </Layout>

    );
  }
}

export default MySnaps;
