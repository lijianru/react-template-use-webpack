import * as React from 'react'
import { Button, Table } from 'antd'
import axios from 'axios'

interface Props {}
interface State {
  list: any[]
}

const columns = [
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'last_reply_at',
    dataIndex: 'last_reply_at',
    key: 'last_reply_at',
  },
  {
    title: 'create_at',
    dataIndex: 'create_at',
    key: 'create_at',
  },
]

@log
class Home extends React.Component<Props, State> {
  state = { list: [] }
  getData() {
    axios.get('https://cnodejs.org/api/v1/topics').then(resp => {
      console.table(resp.data.data)
      this.setState({ list: [...resp.data.data] })
    })
  }

  render() {
    const { list } = this.state

    return (
      <div>
        <section>
          <Button
            onClick={() => {
              this.getData()
            }}
          >
            TEST
          </Button>
        </section>
        // @ts-ignore
        <Table columns={columns} dataSource={list} rowKey={item => item.id} />
      </div>
    )
  }
}

export default Home

function log(e: any) {
  console.log(e)
}
