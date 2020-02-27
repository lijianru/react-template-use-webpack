import * as React from 'react'
import { Button, Table } from 'antd'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { AppState } from '../../redux/store'
import { getAllCharacters } from '../../redux/actions/characterAction'
import { Character } from '../../redux/reducers/characterReducer'

type State = {}

type OwnProps = {}

type DispatchProps = {
  getAllCharacters: (params: any) => void;
}

type StateProps = {
  characters: Character[];
}

type Props = StateProps & OwnProps & DispatchProps

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Height',
    dataIndex: 'height',
    key: 'height',
  },
  {
    title: 'Mass',
    dataIndex: 'mass',
    key: 'mass',
  },
  {
    title: 'Hair',
    dataIndex: 'hair_color',
    key: 'hair_color',
  },
  {
    title: 'Skin',
    dataIndex: 'skin_color',
    key: 'skin_color',
  },
  {
    title: 'Eye',
    dataIndex: 'eye_color',
    key: 'eye_color',
  },
]

class CharacterList extends React.Component<Props, State> {
  componentDidMount(): void {
    this.props.getAllCharacters({ search: 'r2' })
  }

  getData(): void {
    this.props.getAllCharacters({ search: 'r2' })
  }

  render(): React.ReactElement {
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
        <Table columns={columns} dataSource={this.props.characters} />
      </div>
    )
  }
}

// ownProps 参数未使用
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = (states: AppState, ownProps: OwnProps): StateProps => {
  return {
    characters: states.characterState.characters,
  }
}

const mapDispatchToProps = (
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ThunkDispatch<AppState, undefined, any>,
  // ownProps 参数未使用
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ownProps: OwnProps
): DispatchProps => {
  return {
    getAllCharacters: async (params: any): Promise<void> => {
      await dispatch(getAllCharacters(params))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterList)
