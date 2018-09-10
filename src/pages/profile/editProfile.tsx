import { observer } from 'mobx-react';
import mobxReactForm from 'mobx-react-form';
import * as React from 'react';
import validatorjs from 'validatorjs';

import { IUser } from '../../states/appState';
import EditProfileForm from './editProfileForm';

const MobxReactForm = mobxReactForm as any
const plugins = { dvr: validatorjs }
const onSuccess = function onSuccessFunc(form) {
  console.log('form submit!')
}
const onError = function onErrorFunc(form) {
  console.log('All form errors', form.errors());
}
const hooks = {
  onSuccess,
  onError
}

@observer
export default class EditProfile extends React.Component<{ user: IUser }> {
  render() {

    const fields = [
      {
        name: 'displayName',
        label: 'eAmuse Name',
        rules: 'required|string|between:4,20',
        value: this.props.user.displayName
      },
      {
        name: 'email',
        label: 'Email',
        rules: 'email|string',
        value: this.props.user.email
      },
      {
        name: 'realName',
        label: 'Real Name',
        rules: 'string|between:5,40',
        value: this.props.user.realName
      }
    ]
    const form = new MobxReactForm({ fields }, { plugins, hooks })
    return (
      <EditProfileForm form={form}></EditProfileForm>
    )
  }
}