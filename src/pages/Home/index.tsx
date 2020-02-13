import * as React from 'react'
import Header from 'Components/Header'
import './styles.scss'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <section>
          <ul>
            <li className="test">吃饭</li>
            <li>睡觉</li>
            <li>打豆豆</li>
          </ul>
        </section>
      </div>
    )
  }
}
