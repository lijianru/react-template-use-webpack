import * as React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { AppState } from '../../redux/store'
import { getAllCharacters, CharacterAction } from '../../redux/actions/characterAction'
import { getAllExamples, Action } from '../../redux/actions/exampleAction'
import { CharacterState } from '../../redux/reducers/characterReducer'
import { ExampleState } from '../../redux/reducers/exampleReducer'

type State = {}

type OwnProps = {}

type DispatchProps = {
  getAllCharacters: () => void;
  getAllExamples: () => void;
}

type StateProps = {
  characters: CharacterState;
  examples: ExampleState;
}

type Props = StateProps & OwnProps & DispatchProps

class Home extends React.Component<Props, State> {
  getData(): void {
    this.props.getAllCharacters()
    this.props.getAllExamples()
  }

  render(): React.ReactElement {
    console.table(this.props.characters.characters)
    console.table(this.props.examples.examples)
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

// ownProps 参数未使用
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = (states: AppState, ownProps: OwnProps): StateProps => {
  return {
    characters: states.characterState,
    examples: states.exampleState,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
  // ownProps 参数未使用
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ownProps: OwnProps
): DispatchProps => {
  return {
    getAllCharacters: async (): Promise<void> => {
      await dispatch(getAllCharacters())
    },
    getAllExamples: async (): Promise<void> => {
      await dispatch(getAllExamples())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
