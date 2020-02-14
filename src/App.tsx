import * as React from 'react'
import { Layout } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './Components/Navigation'
import Routers from './Routers'
import styles from 'App.scss'
import { Provider } from 'react-redux'
import configureStore from './redux/store'

const { Header, Content, Footer } = Layout

const store = configureStore({})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout className={styles.app}>
            <Navigation />
            <Layout>
              <Header className={styles.header} />
              <Content className={styles.container}>
                <div className={styles.content}>
                  <Routers />
                </div>
              </Content>
              <Footer className={styles.footer}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
          </Layout>
        </Router>
      </Provider>
    )
  }
}
