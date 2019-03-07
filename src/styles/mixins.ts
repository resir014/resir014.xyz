/* eslint-disable import/prefer-default-export */
import { em } from 'polished'
import { pxSizes } from './variables'

export const getEmSize = (size: number) => em(size, pxSizes.fontSize.regular)
