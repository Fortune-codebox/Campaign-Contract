import React, {Fragment} from 'react';
import './index.css';
import 'semantic-ui-css/semantic.min.css';

function MyApp({ Component, pageProps }) {
  return <div className="min-h-screen"><Component {...pageProps} /></div>
}

export default MyApp;