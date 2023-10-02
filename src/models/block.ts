import { uniqueId } from 'lodash'
import { getColor, getTextColor } from './color'

export class Block {
  readonly id: string
  color: string
  textColor: string

  // if it is gonna merge to other block, it will disappear
  willDisappear?: boolean

  // if it gonna merge with another block, willMerge = true
  willMerge?: boolean

  constructor(
    public x: number,
    public y: number,
    public value = 2,

    // Properties for UI effect
    public isMergeBlock = false,
    public isNewBlock = false
  ) {
    this.id = uniqueId()
    this.color = getColor(this.value)
    this.textColor = getTextColor(this.value)
  }
}
