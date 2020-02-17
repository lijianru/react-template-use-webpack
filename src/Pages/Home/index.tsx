import * as React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { AppState } from '../../redux/store'
import { getAllCharacters } from '../../redux/actions/CharacterActions'
import { CharacterState } from '../../redux/reducers/characterReducer'

type State = {}

type OwnProps = {}

type DispatchProps = {
  getAllCharacters: () => void;
}

type StateProps = {
  data: CharacterState;
}

type Props = StateProps & OwnProps & DispatchProps

class Home extends React.Component<Props, State> {
  getData() {
    this.props.getAllCharacters()
  }

  render() {
    console.log(this.props.data)
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
      </div>
    )
  }
}

const mapStateToProps = (states: AppState, ownProps: OwnProps): StateProps => {
  return {
    data: states.characterState,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
  ownProps: OwnProps
): DispatchProps => {
  return {
    getAllCharacters: async () => {
      await dispatch(getAllCharacters())
    },
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  mapStateToProps,
  mapDispatchToProps
)(Home)
