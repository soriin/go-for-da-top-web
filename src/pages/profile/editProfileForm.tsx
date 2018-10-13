import { observer } from 'mobx-react';
import * as React from 'react';

@observer
export default class EditProfileForm extends React.Component<IEditProfileFormProps>{
  render() {
    return (
      <form onSubmit={this.props.form.onSubmit}>
        <p>{this.props.form.$('displayName').error}</p>
        <p>{this.props.form.$('email').error}</p>
        <p>{this.props.form.$('realName').error}</p>
        <div>
          <label htmlFor={this.props.form.$('displayName').id}>
            {this.props.form.$('displayName').label}
          </label>
          <input {...this.props.form.$('displayName').bind()} />
        </div>
        <div>
          <label htmlFor={this.props.form.$('email').id}>
            {this.props.form.$('email').label}
          </label>
          <input {...this.props.form.$('email').bind()} />
        </div>
        <div>
          <label htmlFor={this.props.form.$('realName').id}>
            {this.props.form.$('realName').label}
          </label>
          <input {...this.props.form.$('realName').bind()} />
        </div>

        <button type="submit" onClick={this.props.form.onSubmit}>Submit</button>
        <button type="button" onClick={this.props.form.onClear}>Clear</button>
        <button type="button" onClick={this.props.form.onReset}>Reset</button>

        <p>{this.props.form.error}</p>
      </form>
    )
  }
}

interface IEditProfileFormProps {
  form: any
}