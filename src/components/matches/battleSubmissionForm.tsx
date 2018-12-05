import { observer } from 'mobx-react';
import * as React from 'react';
import { action } from 'mobx';
import ClickableIcon from '../../modules/icons/clickableIcon';
import { Props } from '@fortawesome/react-fontawesome';

interface IProps {
  form: any
}

@observer
export default class BattleSubmissionForm extends React.Component<IProps> {

  createPreview = (file) => {
    file.preview = window.URL.createObjectURL(file);
    return file.preview;
  }

  destroyPreview = (file, field) => (e) => {
    window.URL.revokeObjectURL(file.preview);

    const index = field.files.indexOf(file);
    action(() => field.files.splice(index, 1))();
  }

  renderSelectedFile(fileField) {
    if (fileField.files && fileField.files.length === 1) {
      const file = fileField.files[0]
      const iconProps: Props = {
        icon: 'trash-alt',
        size: '2x'
      }
      return (
        <div className="gfdt-image-preview-container">
          <img
            src={this.createPreview(file)}
            alt={file.name}
            className="gfdt-image-preview"
          />
          <ClickableIcon iconProps={iconProps} onClick={this.destroyPreview(file, fileField)} />
          </div>
      )
    }
  }

  render() {
    const fileField = this.props.form.$('imageData')
    const exScoreField = this.props.form.$('exScore')
    const selectedFileDiv = this.renderSelectedFile(fileField)

    return (
      <form>
        <p>{exScoreField.error}</p>
        <p>{fileField.error}</p>
        <div>
          <label htmlFor={exScoreField.id}>
            {exScoreField.label}
          </label>
          <input {...exScoreField.bind()} />
        </div>
        <div>
          <label htmlFor={fileField.id}>
            {fileField.label}
          </label>
          <input
            {...fileField.bind({
              onChange: fileField.onDrop
            })}
            className='gfdt-display-none'
          />
          <button
            className='btn btn-primary'
            onBlur={fileField.onBlur}
            onFocus={fileField.onFocus}
            onClick={() => document.getElementById(fileField.id).click()}
            type="button"
          >
            <span>Upload</span>
          </button>
          {selectedFileDiv}
        </div>
        <p>{this.props.form.error}</p>
      </form>
    )
  }
}