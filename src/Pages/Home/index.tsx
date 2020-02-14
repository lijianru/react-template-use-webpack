import * as React from 'react'
import styles from './styles.scss'
import { Button } from 'antd'
import { connect } from 'react-redux'

@log
class Home extends React.Component {
  render() {
    return (
      <div>
        <section>
          <ul>
            <li className={styles.test}>吃饭</li>
            <li>睡觉</li>
            <li>打豆豆</li>
          </ul>
          <Button>TEST</Button>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

function log(e: any) {
  console.log(e)
}
