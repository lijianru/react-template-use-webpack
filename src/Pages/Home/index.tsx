import * as React from 'react'
import Header from 'Components/Header'
import styles from './styles.scss'

@log
export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <section>
          <ul>
            <li className={styles.test}>吃饭</li>
            <li>睡觉</li>
            <li>打豆豆</li>
          </ul>
        </section>
      </div>
    )
  }
}

function log(e: any) {
  console.log(e)
}
