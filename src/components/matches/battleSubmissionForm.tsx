import { observer } from 'mobx-react';
import * as React from 'react';

@observer
export default class BattleSubmissionForm extends React.Component<IBattleSubmissionFormProps>{
  render() {
    return (
      <form>
        <p>{this.props.form.$('exScore').error}</p>
        <p>{this.props.form.$('imageData').error}</p>
        <div>
          <label htmlFor={this.props.form.$('exScore').id}>
            {this.props.form.$('exScore').label}
          </label>
          <input {...this.props.form.$('exScore').bind()} />
        </div>
        <div>
          <label htmlFor={this.props.form.$('imageData').id}>
            {this.props.form.$('imageData').label}
          </label>
          <input {...this.props.form.$('imageData').bind()} />
        </div>
        <p>{this.props.form.error}</p>
      </form>
    )
  }
}

interface IBattleSubmissionFormProps {
  form: any
}