import * as React from 'react'
import { IBattleEntry } from '../../states/appState';

interface IState  {
  entry: IBattleEntry
}

export default function BattleData (props: IState) {
  return (
    <div>
      <div className='gfdt-grid'>
        <span>Current EX Score: {props.entry.exScore}</span>
        <span className='gfdt-image-preview'>Image Proof:
          <a href={props.entry.imageProofUrl} target='_blank'>
            <img src={props.entry.imageProofUrl} width='250px' />
          </a>
        </span>
      </div>
    </div>
  )
}