import * as React from 'react'
import { transparentize } from 'polished'

import { Box, colors } from '../../chungking-core'
import fetchTwitchData from '../../../utils/fetchTwitchData'
import { TwitchData } from '../../../types/default'
import OfflineBox from './OfflineBox'
import OnlineBox from './OnlineBox'

const LiveBanner: React.FC = () => {
  const [currentStream, setCurrentStream] = React.useState<TwitchData | undefined>(undefined)

  React.useEffect(() => {
    const handler = async () => {
      const stream = await fetchTwitchData()

      setCurrentStream(stream)
    }

    handler()
  }, [])

  const getBoxColor = React.useMemo(() => {
    return currentStream ? '#9146FF' : colors.red30
  }, [currentStream])

  return (
    <Box
      p="md"
      border="2px solid"
      borderColor={getBoxColor}
      backgroundColor={transparentize(0.75, getBoxColor)}
      borderRadius={8}
      boxShadow="single"
    >
      {currentStream ? <OnlineBox stream={currentStream} /> : <OfflineBox />}
    </Box>
  )
}

export default LiveBanner
