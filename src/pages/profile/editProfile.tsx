import { observer } from 'mobx-react';
import mobxReactForm from 'mobx-react-form';
import * as React from 'react';
import validatorjs from 'validatorjs';

import userService from '../../modules/user/userSvc';
import { IUser } from '../../states/appState';
import { IDefaultProps } from '../../utils/IDefaultProps';
import EditProfileForm from './editProfileForm';

const MobxReactForm = mobxReactForm as any
const plugins = { dvr: validatorjs }

@observer
export default class EditProfile extends React.Component<IDefaultProps> {
  async onSuccess(form) {
    const formValues: IUser = {
      _id: this.props.appState.user.data._id,
      realName: form.$('realName').$value,
      displayName: form.$('displayName').$value,
      email: form.$('email').$value
    }
    const updatedUser = await userService.updateUser(formValues)
    if (updatedUser) {
      this.props.appState.user.data = updatedUser
    }
  }

  onError(form) {
    console.log('All form errors', form.errors());
  }

  render() {
    const hooks = {
      onSuccess: this.onSuccess.bind(this),
      onError: this.onError
    }
    const fields = [
      {
        name: 'displayName',
        label: 'eAmuse Name',
        rules: 'required|string|between:4,20',
        value: this.props.appState.user.data.displayName
      },
      {
        name: 'email',
        label: 'Email',
        rules: 'email|string',
        value: this.props.appState.user.data.email
      },
      {
        name: 'realName',
        label: 'Real Name',
        rules: 'string|between:5,40',
        value: this.props.appState.user.data.realName
      }
    ]
    const form = new MobxReactForm({ fields }, { plugins, hooks })
    return (
      <EditProfileForm form={form}></EditProfileForm>
    )
  }
}