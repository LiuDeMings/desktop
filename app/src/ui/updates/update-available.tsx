import * as React from 'react'
import { LinkButton } from '../lib/link-button'
import { updateStore } from '../lib/update-store'
import { Octicon, OcticonSymbol } from '../octicons'

interface IUpdateAvailableProps {
  readonly updateAvailble: boolean
}

interface IUpdateAvailableState {
  readonly isActive: boolean,
}

/**
 * A component which tells the user an update is available and gives them the
 * option of moving into the future or being a luddite.
 */
export class UpdateAvailable extends React.Component<IUpdateAvailableProps, IUpdateAvailableState> {
  public constructor(props: IUpdateAvailableProps) {
    super(props)

    this.state = {
      isActive: this.props.updateAvailble,
    }
  }

  public render() {
    return (
      <div
        id='update-available'
        className={this.state.isActive ? 'active' : ''}
        onSubmit={this.updateNow}
      >
        <Octicon
          className='icon'
          symbol={OcticonSymbol.desktopDownload} />

        <span>
          An updated version of GitHub Desktop is avalble and will be installed at the next launch. See what's new or <LinkButton onClick={this.updateNow}>restart now </LinkButton>.
        </span>

        <a
          className='close'
          onClick={this.dismiss}>
          <Octicon symbol={OcticonSymbol.x} />
        </a>
      </div>
    )
  }

  private updateNow = () => {
    updateStore.quitAndInstallUpdate()
  }

  private dismiss = () => {
    this.setState({
      isActive: false,
    })
  }
}
