import React, {Fragment} from 'react'
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react'
import Header from './Header';


const Layout = (props) => {
  return (
      <Fragment>
          
           <Container>
            {props.children}
          </Container>
      </Fragment>
  )
}

export default Layout
