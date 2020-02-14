import * as React from 'react'
import { Layout } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './Components/Navigation'
import Routers from './Routers'
import styles from 'App.scss'

const { Header, Content, Footer } = Layout

export default class App extends React.Component {
  render() {
    return (
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
    )
  }
}
